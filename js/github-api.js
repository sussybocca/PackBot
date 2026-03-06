// Base URL for Netlify Functions (relative)
const FUNCTIONS_BASE = '/.netlify/functions';

async function apiCall(endpoint, method, body) {
    const res = await fetch(`${FUNCTIONS_BASE}/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Request failed');
    }
    return res.json();
}

// Attach functions to the global window object
window.pushBot = async function(files, botName, subdir = '') {
    // files = { 'path/file': 'content', ... }
    // subdir will be appended to USER_CREATED_BOTS/
    return apiCall('push-to-github', 'POST', { files, subdir: botName });
};

window.getBot = async function(botName) {
    return apiCall('get-bot', 'POST', { botName });
};

window.listBots = async function() {
    return apiCall('list-bots', 'GET');
};

window.deleteBot = async function(botName) {
    return apiCall('delete-bot', 'POST', { botName });
};
