// Very basic template-based generator – extend as needed
export function generateBotFromDescription(description, botName) {
    // Extract keywords to influence the bot's personality
    const lowerDesc = description.toLowerCase();
    const isJokeBot = /joke|funny|laugh/i.test(lowerDesc);
    const isWeatherBot = /weather|forecast|rain|sun/i.test(lowerDesc);
    const isFriendly = /friend|help|assistant/i.test(lowerDesc);

    // Create logic.txt with some example rules
    let logicRules = `# Bot logic for "${botName}"\n`;
    logicRules += `# Format: pattern : response\n\n`;
    if (isJokeBot) {
        logicRules += `tell me a joke : Why did the chicken cross the road? To get to the other side!\n`;
        logicRules += `another joke : What do you call a fake noodle? An impasta.\n`;
    } else {
        logicRules += `hello : Hi there! How can I help?\n`;
        logicRules += `how are you : I'm just a bot, but I'm doing great!\n`;
    }
    if (isWeatherBot) {
        logicRules += `weather in * : I'm not connected to a live weather service, but it's always sunny in PackBot!\n`;
    }
    logicRules += `* : I'm not sure how to respond to that. Try asking something else.\n`;

    // Create index.html – a simple chat interface
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${botName}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="chat-container">
        <header>
            <h1>${botName}</h1>
            <p>Powered by PackBot</p>
        </header>
        <div id="chat-log" class="chat-log"></div>
        <div class="input-area">
            <input type="text" id="user-input" placeholder="Type your message...">
            <button id="send-btn">Send</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`;

    // Create script.js – the bot engine that reads logic.txt
    const scriptJs = `// Simple bot engine – loads logic.txt and matches patterns
let rules = [];

async function loadLogic() {
    try {
        const response = await fetch('logic.txt');
        const text = await response.text();
        parseRules(text);
    } catch (e) {
        console.error('Failed to load logic.txt', e);
    }
}

function parseRules(text) {
    rules = [];
    const lines = text.split('\\n');
    for (let line of lines) {
        line = line.trim();
        if (line === '' || line.startsWith('#')) continue;
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        const pattern = line.substring(0, colonIndex).trim();
        const response = line.substring(colonIndex + 1).trim();
        // Convert simple wildcard * to regex
        const regexStr = '^' + pattern.replace(/\\*/g, '.*') + '$';
        rules.push({
            pattern: new RegExp(regexStr, 'i'),
            response: response
        });
    }
}

function getResponse(message) {
    for (let rule of rules) {
        if (rule.pattern.test(message)) {
            return rule.response;
        }
    }
    return "I don't understand.";
}

// UI code
document.addEventListener('DOMContentLoaded', () => {
    loadLogic();
    const input = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatLog = document.getElementById('chat-log');

    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ' + sender;
        msgDiv.textContent = \`\${sender === 'user' ? 'You' : 'Bot'}: \${text}\`;
        chatLog.appendChild(msgDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    async function handleSend() {
        const msg = input.value.trim();
        if (!msg) return;
        addMessage('user', msg);
        input.value = '';

        // Wait a moment to simulate thinking
        setTimeout(() => {
            const reply = getResponse(msg);
            addMessage('bot', reply);
        }, 300);
    }

    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });
});`;

    // Create style.css – basic styling
    const styleCss = `body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #f0f2f5;
}
.chat-container {
    max-width: 600px;
    margin: 2rem auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
}
header {
    background: #0070f3;
    color: white;
    padding: 1rem;
    text-align: center;
}
header h1 {
    margin: 0;
    font-size: 1.5rem;
}
.chat-log {
    height: 300px;
    overflow-y: auto;
    padding: 1rem;
    background: #fafafa;
}
.message {
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border-radius: 18px;
    max-width: 70%;
    clear: both;
}
.message.user {
    background: #0070f3;
    color: white;
    float: right;
}
.message.bot {
    background: #e5e5ea;
    color: black;
    float: left;
}
.input-area {
    display: flex;
    border-top: 1px solid #ddd;
    padding: 0.5rem;
    background: white;
}
#user-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
}
#send-btn {
    background: #0070f3;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
}`;

    // Return the files object
    return {
        'logic.txt': logicRules,
        'index.html': indexHtml,
        'script.js': scriptJs,
        'style.css': styleCss
    };
}
