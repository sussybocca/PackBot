const { Octokit } = require('@octokit/rest');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { files, subdir = '' } = JSON.parse(event.body);
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Missing GitHub configuration' }) };
  }

  const octokit = new Octokit({ auth: token });

  try {
    // 1. Get the repository's default branch
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    const defaultBranch = repoData.default_branch;

    // 2. Get the latest commit SHA for the branch
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${defaultBranch}`,
    });
    const latestCommitSha = refData.object.sha;

    // 3. Get the FULL commit data to extract the tree SHA
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.tree.sha; // This MUST be valid

    // 4. Create blobs for each new file
    const basePath = subdir ? `USER_CREATED_BOTS/${subdir}/` : 'USER_CREATED_BOTS/';

    const treeEntries = await Promise.all(
      Object.entries(files).map(async ([filePath, content]) => {
        const { data: blob } = await octokit.git.createBlob({
          owner,
          repo,
          content,
          encoding: 'utf-8',
        });
        return {
          path: `${basePath}${filePath}`,
          mode: '100644',
          type: 'blob',
          sha: blob.sha,
        };
      })
    );

    // 5. Create a new tree with the valid base_tree
    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha, // Now guaranteed to be fresh
      tree: treeEntries,
    });

    // 6. Create a commit pointing to the new tree
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: `PackBot: push to ${subdir || 'root'} [skip ci]`,
      tree: newTree.sha,
      parents: [latestCommitSha],
    });

    // 7. Update the branch
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${defaultBranch}`,
      sha: newCommit.sha,
      force: false,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // Add more specific error handling
    if (error.status === 422) {
      return {
        statusCode: 422,
        body: JSON.stringify({ 
          error: 'Git tree creation failed. The base tree SHA might be invalid. Please try again.',
          details: error.message 
        }),
      };
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
