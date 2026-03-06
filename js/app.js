// This file assumes the functions from github-api.js and bot-generator.js are globally available (attached to window).

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

            const files = window.generateBotFromDescription(description, safeBotName);
            try {
                const result = await window.pushBot(files, safeBotName);
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
            await window.pushBot(currentFiles, safeBotName);
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
            const data = await window.listBots();
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
            // Replace with your actual GitHub username and repo name
            const owner = 'sussybocca'; // <-- CHANGE THIS
            const repo = 'packbot-user-bots';      // <-- CHANGE THIS IF DIFFERENT
            const branch = 'main';
            const baseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/USER_CREATED_BOTS/${botName}`;
            iframe.src = `${baseUrl}/index.html`;
        }
    };

    // Delete bot (optional)
    window.deleteBot = async function(botName) {
        if (!confirm(`Delete bot "${botName}"?`)) return;
        try {
            await window.deleteBot(botName);
            loadBotList();
        } catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    // Initial load of bot list
    loadBotList();
});
