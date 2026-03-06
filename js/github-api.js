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

export async function pushBot(files, botName, subdir = '') {
    // files = { 'path/file': 'content', ... }
    // subdir will be appended to USER_CREATED_BOTS/
    return apiCall('push-to-github', 'POST', { files, subdir: botName });
}

export async function getBot(botName) {
    return apiCall('get-bot', 'POST', { botName });
}

export async function listBots() {
    return apiCall('list-bots', 'GET');
}

export async function deleteBot(botName) {
    return apiCall('delete-bot', 'POST', { botName });
}
