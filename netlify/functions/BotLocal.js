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

const SALT = 'packbot_salt_2026';

function decryptPath(encoded) {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const salted = Buffer.from(base64, 'base64').toString('utf-8');
    if (!salted.startsWith(SALT)) throw new Error('Invalid salt');
    return salted.slice(SALT.length).split('|');
  } catch {
    return null;
  }
}

exports.handler = async (event) => {
  console.log('BotLocal invoked, path:', event.path);

  // Extract encrypted part after /BotLocal/
  const parts = event.path.split('/BotLocal/');
  if (parts.length < 2) {
    return { statusCode: 400, body: 'Invalid path' };
  }
  const encrypted = parts[1]; // e.g., "abc123xyz"

  const decrypted = decryptPath(encrypted);
  if (!decrypted || decrypted.length !== 2) {
    return { statusCode: 400, body: 'Invalid file reference' };
  }
  const [botName, filePath] = decrypted;

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    return { statusCode: 500, body: 'Missing GitHub configuration' };
  }

  const octokit = new Octokit({ auth: token });

  try {
    const { data: repoData } = await octokit.repos.get({ owner, repo });
    const defaultBranch = repoData.default_branch;

    const githubPath = `USER_CREATED_BOTS/${botName}/${filePath}`;
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: githubPath,
      ref: defaultBranch,
    });

    if (!data.content) {
      return { statusCode: 404, body: 'File not found' };
    }

    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'ALLOWALL',
      },
      body: content,
    };
  } catch (error) {
    console.error('BotLocal error:', error);
    if (error.status === 404) {
      return { statusCode: 404, body: 'File not found in GitHub' };
    }
    return { statusCode: 500, body: 'Internal error' };
  }
};
