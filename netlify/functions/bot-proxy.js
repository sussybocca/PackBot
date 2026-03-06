const { Octokit } = require('@octokit/rest');

// Map file extensions to MIME types
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
  // The path after "/bot-proxy/" is in event.path, but we need to extract the relevant part.
  // Netlify Functions receive the whole path as event.path, e.g., "/.netlify/functions/bot-proxy/my-bot/index.html"
  // We'll split and take everything after "/bot-proxy/".
  const pathParts = event.path.split('/bot-proxy/');
  if (pathParts.length < 2) {
    return { statusCode: 400, body: 'Invalid path' };
  }
  const fullPath = pathParts[1]; // e.g., "my-bot/index.html"

  // Split into bot name and file path
  const slashIndex = fullPath.indexOf('/');
  if (slashIndex === -1) {
    return { statusCode: 400, body: 'Missing file path' };
  }
  const botName = fullPath.substring(0, slashIndex);
  const filePath = fullPath.substring(slashIndex + 1); // e.g., "index.html"

  if (!botName || !filePath) {
    return { statusCode: 400, body: 'Invalid bot name or file path' };
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = 'main'; // or use default branch detection if needed

  if (!token || !owner || !repo) {
    return { statusCode: 500, body: 'Missing GitHub configuration' };
  }

  const octokit = new Octokit({ auth: token });

  try {
    // Construct the path in the GitHub repo
    const githubPath = `USER_CREATED_BOTS/${botName}/${filePath}`;

    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
      ref: branch,
    });

    if (!data.content) {
      return { statusCode: 404, body: 'File not found' };
    }

    // GitHub returns content base64-encoded
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    // Determine MIME type from file extension
    const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*', // Allow your frontend to fetch if needed
        // Explicitly remove X-Frame-Options
        'X-Frame-Options': 'ALLOWALL', // Not standard, but we'll just omit it – Netlify may add its own? We'll override.
      },
      body: content,
    };
  } catch (error) {
    console.error('Proxy error:', error);
    if (error.status === 404) {
      return { statusCode: 404, body: 'File not found in GitHub' };
    }
    return { statusCode: 500, body: 'Internal server error' };
  }
};
