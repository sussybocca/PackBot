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
    const path = `USER_CREATED_BOTS/${botName}`;
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    // data is an array of items
    const files = {};
    for (const item of data) {
      if (item.type === 'file') {
        const fileData = await octokit.repos.getContent({
          owner,
          repo,
          path: item.path,
          ref: branch,
        });
        // content is base64 encoded
        const content = Buffer.from(fileData.data.content, 'base64').toString('utf-8');
        files[item.name] = content;
      }
    }

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ botName, files }),
    };
  } catch (error) {
    if (error.status === 404) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Bot not found' }) };
    }
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
