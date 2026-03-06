const { Octokit } = require('@octokit/rest');

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const octokit = new Octokit({ auth: token });

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: 'USER_CREATED_BOTS',
      ref: 'main',
    });

    const bots = data.filter(item => item.type === 'dir').map(dir => dir.name);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ bots }),
    };
  } catch (error) {
    if (error.status === 404) {
      // Folder may not exist yet
      return { statusCode: 200, body: JSON.stringify({ bots: [] }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
