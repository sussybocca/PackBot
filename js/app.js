// app.js – PackBot frontend logic
// Uses global functions from github-api.js and bot-generator.js

document.addEventListener('DOMContentLoaded', () => {
    // ========== MODE SWITCHING (only on editor page) ==========
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

    // ========== SIMPLE MODE – GENERATE BOT ==========
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
                previewBot(safeBotName); // show preview
            } catch (err) {
                document.getElementById('simple-output').innerHTML = `<p style="color:red">❌ Error: ${err.message}</p>`;
            }
        });
    }

    // ========== CODE MODE – FILE TABS AND EDITOR ==========
    const fileTabs = document.querySelectorAll('.file-tab');
    const fileEditor = document.getElementById('file-editor');
    // In-memory store for current files being edited
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

        // Save on input
        fileEditor.addEventListener('input', () => {
            currentFiles[currentFile] = fileEditor.value;
        });

        // Add new file button
        document.getElementById('add-file-btn')?.addEventListener('click', () => {
            const fileName = prompt('Enter new file name (e.g., data.json):');
            if (fileName && !currentFiles[fileName]) {
                currentFiles[fileName] = '';
                // Create new tab
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
                // Switch to the new tab
                fileTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentFile = fileName;
                fileEditor.value = currentFiles[fileName];
            } else if (fileName) {
                alert('File already exists or invalid name');
            }
        });
    }

    // ========== PUSH CODE MODE BOT ==========
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

    // ========== LOAD BOT LIST ==========
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
                // Use template literals and escape bot name to prevent injection
                const safeBot = bot.replace(/[^a-zA-Z0-9_-]/g, '');
                html += `<div class="bot-card">
                    <h3>${bot}</h3>
                    <button class="button small" onclick="previewBot('${safeBot}')">Preview</button>
                    <button class="button small secondary" onclick="deleteBot('${safeBot}')">Delete</button>
                </div>`;
            });
            container.innerHTML = html;
        } catch (err) {
            container.innerHTML = `<p style="color:red">Error loading bots: ${err.message}</p>`;
        }
    }

    // ========== PREVIEW BOT ==========
    window.previewBot = function(botName) {
        const iframe = document.getElementById('preview-frame');
        const url = `/bot-preview/${botName}/index.html`;
        
        if (iframe) {
            // We're on the editor page – load in the iframe
            iframe.src = url;
        } else {
            // We're on the main page or somewhere without an iframe – open in new tab
            window.open(url, '_blank');
        }
    };

    // ========== DELETE BOT ==========
    window.deleteBot = async function(botName) {
        if (!confirm(`Delete bot "${botName}"?`)) return;
        try {
            await window.deleteBot(botName);
            loadBotList();
        } catch (err) {
            alert(`Delete failed: ${err.message}`);
        }
    };

    // ========== INITIAL LOAD ==========
    loadBotList();
});
