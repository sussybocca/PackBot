const { Octokit } = require('@octokit/rest');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { botName } = JSON.parse(event.body);
  if (!botName) {
    return { statusCode: 400, body: JSON.stringify({ error: 'botName required' }) };
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = 'main';

  const octokit = new Octokit({ auth: token });

  try {
    // 1. Get current commit
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    const latestCommitSha = refData.object.sha;

    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.tree.sha;

    // 2. Create a new tree without the bot folder
    // To delete a folder, we need to include it with sha=null in the new tree.
    // But we must first get the current tree and filter out entries under that folder.
    // Simpler: use the repo contents API to delete each file? That's many calls.
    // For brevity, we'll just delete recursively using the API (there's a way to delete a folder via tree update with null).
    // We'll do: get current tree, filter out any entry with path starting with `USER_CREATED_BOTS/${botName}/`, then create new tree, commit.
    const { data: treeData } = await octokit.git.getTree({
      owner,
      repo,
      tree_sha: baseTreeSha,
      recursive: true,
    });

    const newTree = treeData.tree.filter(item => !item.path.startsWith(`USER_CREATED_BOTS/${botName}/`));

    const { data: createdTree } = await octokit.git.createTree({
      owner,
      repo,
      tree: newTree,
    });

    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: `PackBot: delete bot ${botName} [skip ci]`,
      tree: createdTree.sha,
      parents: [latestCommitSha],
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    });

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
