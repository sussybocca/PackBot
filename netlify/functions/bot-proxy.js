const { Octokit } = require('@octokit/rest');

const mimeTypes = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

exports.handler = async (event) => {
  // Log the full path for debugging (visible in Netlify function logs)
  console.log('Full event.path:', event.path);

  // Expected internal path: /.netlify/functions/bot-proxy/botName/file.html
  // Split on '/bot-proxy/'
  const pathParts = event.path.split('/bot-proxy/');
  console.log('pathParts:', pathParts);

  if (pathParts.length < 2) {
    return {
      statusCode: 400,
      body: `Invalid path: expected '/bot-proxy/' in URL, got ${event.path}`,
    };
  }

  const fullPath = pathParts[1]; // e.g., "adddd/index.html"
  console.log('fullPath:', fullPath);

  const slashIndex = fullPath.indexOf('/');
  if (slashIndex === -1) {
    return {
      statusCode: 400,
      body: `Missing file path in: ${fullPath}`,
    };
  }

  const botName = fullPath.substring(0, slashIndex);
  const filePath = fullPath.substring(slashIndex + 1);

  if (!botName || !filePath) {
    return {
      statusCode: 400,
      body: `Invalid bot name or file path: botName="${botName}", filePath="${filePath}"`,
    };
  }

  console.log(`Bot: ${botName}, File: ${filePath}`);

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = 'main'; // Change to 'master' if needed

  if (!token || !owner || !repo) {
    return { statusCode: 500, body: 'Missing GitHub configuration' };
  }

  const octokit = new Octokit({ auth: token });

  try {
    const githubPath = `USER_CREATED_BOTS/${botName}/${filePath}`;
    console.log('Fetching from GitHub:', githubPath);

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
      ref: branch,
    });

    if (!data.content) {
      return { statusCode: 404, body: 'File not found on GitHub' };
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        // Allow embedding in iframe
        'X-Frame-Options': 'ALLOWALL',
      },
      body: content,
    };
  } catch (error) {
    console.error('Proxy error:', error);
    if (error.status === 404) {
      return { statusCode: 404, body: 'File not found in GitHub' };
    }
    return { statusCode: 500, body: `Internal error: ${error.message}` };
  }
};
