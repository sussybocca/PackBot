// In-memory cache (cleared on function cold start – not persistent)
const cache = new Map();

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    // Store file content and return a token
    const { botName, filePath, content } = JSON.parse(event.body);
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    cache.set(token, { botName, filePath, content });
    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } else if (event.httpMethod === 'GET') {
    // Retrieve by token
    const parts = event.path.split('/BotLocal/');
    if (parts.length < 2) return { statusCode: 400 };
    const token = parts[1];
    const entry = cache.get(token);
    if (!entry) return { statusCode: 404, body: 'Token expired' };
    
    const { content, filePath } = entry;
    const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': contentType,
        'X-Frame-Options': 'ALLOWALL',
      },
      body: content,
    };
  }
};
