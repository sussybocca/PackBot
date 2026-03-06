// Import our modules (using ES modules, but we need to include them as scripts in HTML)
// Since we're using script tags without type="module", we need to attach to window.
// Alternatively, we can bundle, but for simplicity we'll attach to window.

// This file assumes the functions from github-api.js and bot-generator.js are loaded.
// We'll set up event listeners when DOM is ready.

document.addEventListener('DOMContentLoaded', () => {
    // Mode switching
    const simpleBtn = document.getElementById('simple-mode-btn');
    const codeBtn = document.getElementById('code-mode-btn');
    const simplePanel = document.getElementById('simple-panel');
    const codePanel = document.getElementById('code-panel');

    if (simpleBtn && codeBtn) {
        simpleBtn.addEventListener('click', () => {
            simpleBtn.classList.add('active');
            codeBtn.classList.remove('active');
            simplePanel.classList.remove('hidden');
            codePanel.classList.add('hidden');
        });
        codeBtn.addEventListener('click', () => {
            codeBtn.classList.add('active');
            simpleBtn.classList.remove('active');
            codePanel.classList.remove('hidden');
            simplePanel.classList.add('hidden');
        });
    }

    // Simple mode generate
    const generateBtn = document.getElementById('generate-bot');
    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            const description = document.getElementById('bot-description').value;
            const botName = document.getElementById('bot-name').value.trim();
            if (!description || !botName) {
                alert('Please enter a description and a bot name');
                return;
            }
            // Sanitize botName: only alphanumeric, hyphens, underscores
            const safeBotName = botName.replace(/[^a-zA-Z0-9_-]/g, '');
            if (!safeBotName) {
                alert('Bot name must contain only letters, numbers, hyphens, underscores');
                return;
            }

            const files = generateBotFromDescription(description, safeBotName);
            try {
                const result = await pushBot(files, safeBotName);
                document.getElementById('simple-output').innerHTML = `<p style="color:green">✅ Bot "${safeBotName}" created successfully!</p>`;
                loadBotList(); // refresh bot list
                // Optionally preview
                previewBot(safeBotName);
            } catch (err) {
                document.getElementById('simple-output').innerHTML = `<p style="color:red">❌ Error: ${err.message}</p>`;
            }
        });
    }

    // Code mode – file tabs and editor
    const fileTabs = document.querySelectorAll('.file-tab');
    const fileEditor = document.getElementById('file-editor');
    const currentFiles = {
        'logic.txt': '# This is your bot logic\n# Format: pattern : response\nhello : Hello from code mode!',
        'index.html': '<!DOCTYPE html>\n<html>\n<head><title>Code Bot</title></head>\n<body>Hello</body>\n</html>',
        'script.js': 'console.log("Code bot loaded");',
        'style.css': 'body { background: white; }'
    };
    let currentFile = 'logic.txt';

    if (fileTabs.length) {
        fileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                fileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const fileName = tab.dataset.file;
                if (fileName) {
                    currentFile = fileName;
                    fileEditor.value = currentFiles[fileName] || '';
                }
            });
        });
        // Initialize editor with first file
        fileEditor.value = currentFiles['logic.txt'];

        // Save on input? For now just keep in memory.
        fileEditor.addEventListener('input', () => {
            currentFiles[currentFile] = fileEditor.value;
        });

        // Add file button
        document.getElementById('add-file-btn')?.addEventListener('click', () => {
            const fileName = prompt('Enter new file name (e.g., data.json):');
            if (fileName && !currentFiles[fileName]) {
                currentFiles[fileName] = '';
                // add tab
                const tab = document.createElement('button');
                tab.className = 'file-tab';
                tab.dataset.file = fileName;
                tab.textContent = fileName;
                tab.addEventListener('click', () => {
                    fileTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    currentFile = fileName;
                    fileEditor.value = currentFiles[fileName];
                });
                document.querySelector('.file-tabs').appendChild(tab);
                // switch to it
                fileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFile = fileName;
                fileEditor.value = currentFiles[fileName];
            } else if (fileName) {
                alert('File already exists or invalid name');
            }
        });
    }

    // Push code mode bot
    document.getElementById('push-code-bot')?.addEventListener('click', async () => {
        const botName = document.getElementById('code-bot-name').value.trim();
        if (!botName) {
            alert('Enter a bot name');
            return;
        }
        const safeBotName = botName.replace(/[^a-zA-Z0-9_-]/g, '');
        if (!safeBotName) {
            alert('Invalid bot name');
            return;
        }
        try {
            await pushBot(currentFiles, safeBotName);
            alert(`Bot "${safeBotName}" pushed!`);
            loadBotList();
            previewBot(safeBotName);
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    });

    // Load bot list
    async function loadBotList() {
        const container = document.getElementById('bot-list');
        if (!container) return;
        try {
            const data = await listBots();
            const bots = data.bots || [];
            if (bots.length === 0) {
                container.innerHTML = '<p>No bots yet. Create one!</p>';
                return;
            }
            let html = '';
            bots.forEach(bot => {
                html += `<div class="bot-card">
                    <h3>${bot}</h3>
                    <button class="button small" onclick="previewBot('${bot}')">Preview</button>
                    <button class="button small secondary" onclick="deleteBot('${bot}')">Delete</button>
                </div>`;
            });
            container.innerHTML = html;
        } catch (err) {
            container.innerHTML = `<p style="color:red">Error loading bots: ${err.message}</p>`;
        }
    }

    // Preview bot
    window.previewBot = function(botName) {
        const iframe = document.getElementById('preview-frame');
        if (iframe) {
            // Assuming repo is public, construct raw URL
            const owner = 'sussybocca'; // should be dynamic? We'll get from env? For now placeholder.
            const repo = 'packbot-user-bots';
            const branch = 'main';
            const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/USER_CREATED_BOTS/${botName}`;
            // index.html might reference relative paths like script.js, style.css – they will resolve to same folder on raw? Not exactly, because raw serves files with correct MIME but relative links won't work. Better to load a simple proxy or serve via a special preview function.
            // For simplicity, we'll load index.html directly, but scripts/styles won't load due to CORS/same-origin? Actually raw.githubusercontent.com serves with correct MIME, and if we load index.html inside iframe, its relative requests will go to the same raw base path. That should work as long as we set the iframe src to the raw HTML.
            iframe.src = `${baseUrl}/index.html`;
        }
    };

    // Delete bot (optional)
    window.deleteBot = async function(botName) {
        if (!confirm(`Delete bot "${botName}"?`)) return;
        try {
            await deleteBot(botName);
            loadBotList();
        } catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    // Initial load of bot list
    loadBotList();
});
