// COMPLETE PACKBOT GENERATOR - Creates bots that can generate OTHER bots
window.generateBotFromDescription = function(description, botName) {
    // Extract keywords to influence the bot's personality
    const lowerDesc = description.toLowerCase();
    const isJokeBot = /joke|funny|laugh|humor/i.test(lowerDesc);
    const isWeatherBot = /weather|forecast|rain|sun|storm|temperature/i.test(lowerDesc);
    const isFriendly = /friend|help|assistant|support|kind/i.test(lowerDesc);
    const isProfessional = /professional|business|formal|work/i.test(lowerDesc);
    const isPhilosophical = /philosophy|deep|meaning|life|think/i.test(lowerDesc);
    const isGamingBot = /game|gaming|play|rpg|fps/i.test(lowerDesc);
    const isTechBot = /tech|technology|computer|programming|code/i.test(lowerDesc);
    const isCreativeBot = /creative|art|draw|write|story/i.test(lowerDesc);
    const isGeneratorBot = /generate|create|make|build|constructor/i.test(lowerDesc);

    // ----------------------------------------------------------------------
    // 1. LOGIC.TXT - Contains patterns for GENERATING OTHER BOTS
    // ----------------------------------------------------------------------
    let logicRules = `# ===================================================
# ${botName} - BOT GENERATOR EDITION
# This bot can GENERATE other bots with code snippets!
# FORMAT: pattern : response
# ===================================================

# ---------- BOT GENERATION COMMANDS (MAIN FEATURE) ----------
generate a bot : I can help you generate a bot! Tell me what kind of bot you want: weather bot, joke bot, friendly bot, gaming bot, tech bot, or creative bot. Just say "make me a [type] bot called [name]".
make me a bot : Awesome! I'll generate a custom bot for you. First, tell me what personality you want: friendly, professional, funny, philosophical, gaming, tech, or creative? Then give it a name!
create a bot : Bot creation activated! I need two things: 1) What type of bot? 2) What should I name it? Example: "create a weather bot called StormTracker"
build a bot : Let's build a bot together! Specify the type and name like "build a joke bot called LaughMaster"
i want a bot : You want a bot? You got it! Tell me the type and name and I'll generate the complete HTML, CSS, JS, and TXT files for you.
generate a weather bot : Here's a complete weather bot template! Copy this code into index.html, style.css, script.js, and logic.txt:
---
WEATHER BOT INDEX.HTML:
<!DOCTYPE html>
<html>
<head><title>WeatherBot</title><link rel="stylesheet" href="style.css"></head>
<body><div class="chat-container"><h1>WeatherBot</h1><div id="chat"></div><input id="input"/><button id="send">Ask</button></div><script src="script.js"></script></body>
</html>

WEATHER BOT STYLE.CSS:
.chat-container { max-width:600px; margin:20px auto; border-radius:10px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.1); }
h1 { background:#00a8ff; color:white; margin:0; padding:15px; text-align:center; }
#chat { height:400px; overflow-y:auto; padding:15px; background:#f5f5f5; }
.message { margin:10px; padding:10px; border-radius:10px; max-width:70%; }
.user { background:#00a8ff; color:white; float:right; clear:both; }
.bot { background:#e5e5ea; color:black; float:left; clear:both; }
#input { width:80%; padding:10px; border:1px solid #ddd; border-radius:5px; margin:10px; }
#send { padding:10px 20px; background:#00a8ff; color:white; border:none; border-radius:5px; cursor:pointer; }

WEATHER BOT SCRIPT.JS:
const rules = [
    {pattern:/hello|hi|hey/i, response:"Hello! Ask me about the weather!"},
    {pattern:/weather in (.*)/i, response:"I can't fetch live weather, but I hope it's nice in $1! ☀️"},
    {pattern:/rain|storm|snow/i, response:"Stay safe in the weather! I'm here to chat."},
    {pattern:/temperature/i, response:"Temperature varies by location. Check your local forecast!"},
    {pattern:/.*/i, response:"I'm a weather bot! Ask me about weather in your city."}
];
document.getElementById('send').onclick = function() {
    let msg = document.getElementById('input').value;
    let chat = document.getElementById('chat');
    chat.innerHTML += '<div class="message user">You: ' + msg + '</div>';
    for(let rule of rules) {
        if(rule.pattern.test(msg)) {
            chat.innerHTML += '<div class="message bot">Bot: ' + rule.response.replace('$1', msg.match(rule.pattern)[1]||'there') + '</div>';
            break;
        }
    }
    document.getElementById('input').value = '';
    chat.scrollTop = chat.scrollHeight;
};

WEATHER BOT LOGIC.TXT:
# Weather Bot Logic
hello : Hello! Ask me about the weather!
weather in * : I hope it's nice in $1! ☀️
rain : Stay dry out there!
sun : Sunscreen recommended!
* : I'm a weather bot - ask about weather!
---

generate a joke bot : Here's a complete joke bot template with 50+ jokes! Copy these files:

JOKE BOT INDEX.HTML:
<!DOCTYPE html>
<html>
<head><title>JokeMaster</title><style>
body { font-family:Arial; background:#2c3e50; display:flex; justify-content:center; align-items:center; height:100vh; }
.chat-box { width:500px; height:600px; background:white; border-radius:20px; box-shadow:0 10px 30px rgba(0,0,0,0.3); overflow:hidden; display:flex; flex-direction:column; }
.header { background:#e74c3c; color:white; padding:20px; text-align:center; }
.header h1 { margin:0; font-size:24px; }
.messages { flex:1; overflow-y:auto; padding:20px; background:#ecf0f1; }
.message { margin:10px 0; padding:10px 15px; border-radius:15px; max-width:80%; }
.user-message { background:#3498db; color:white; align-self:flex-end; margin-left:auto; }
.bot-message { background:#2ecc71; color:white; }
.input-area { display:flex; padding:15px; background:white; border-top:1px solid #bdc3c7; }
#messageInput { flex:1; padding:10px; border:2px solid #bdc3c7; border-radius:25px; outline:none; }
#sendBtn { background:#e74c3c; color:white; border:none; border-radius:25px; padding:10px 25px; margin-left:10px; cursor:pointer; }
#sendBtn:hover { background:#c0392b; }
</style></head>
<body>
<div class="chat-box">
    <div class="header"><h1>JokeMaster 🤣</h1><p>Your personal comedy bot</p></div>
    <div class="messages" id="messages"></div>
    <div class="input-area"><input id="messageInput" placeholder="Tell me to tell a joke..."><button id="sendBtn">Send</button></div>
</div>
<script>
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call a fake noodle? An impasta.",
    "Why did the scarecrow win an award? He was outstanding in his field.",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fish with no eyes? A fsh!",
    "Why did the math book look sad? Because it had too many problems!",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "I used to be a baker, but I couldn't make enough dough.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call a sleeping bull? A bulldozer.",
    "Why can't you give Elsa a balloon? Because she will let it go!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the coffee file a police report? It got mugged.",
    "What do you call a fish wearing a bowtie? Sofishticated.",
    "Why don't some couples go to the gym? Because some relationships don't work out.",
    "I used to play piano by ear, but now I use my hands.",
    "What do you call a fake noodle? An impasta.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "What do you call a fish with no eyes? A fsh."
];
const responses = {
    "joke": jokes[Math.floor(Math.random() * jokes.length)],
    "another": jokes[Math.floor(Math.random() * jokes.length)],
    "funny": "Glad you think so! Want another?",
    "laugh": "Ha ha! Laughter is the best medicine!",
    "default": "Ask me to tell you a joke! Just say 'tell me a joke'"
};
const messages = document.getElementById('messages');
const input = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = 'message ' + (isUser ? 'user-message' : 'bot-message');
    div.textContent = (isUser ? 'You: ' : 'Bot: ') + text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
sendBtn.onclick = function() {
    const msg = input.value.toLowerCase().trim();
    if(!msg) return;
    addMessage(input.value, true);
    let reply = responses.default;
    if(msg.includes('joke') || msg.includes('funny') || msg.includes('laugh')) {
        reply = jokes[Math.floor(Math.random() * jokes.length)];
    } else if(msg.includes('another') || msg.includes('again') || msg.includes('more')) {
        reply = jokes[Math.floor(Math.random() * jokes.length)];
    } else if(msg.includes('hello') || msg.includes('hi')) {
        reply = "Hello! Want to hear a joke?";
    }
    setTimeout(() => addMessage(reply, false), 500);
    input.value = '';
};
</script></body></html>
---

make a gaming bot : Here's a gaming bot template with RPG stats and game recommendations!

GAMING BOT COMPLETE CODE:
<!DOCTYPE html>
<html>
<head><title>RPG Bot</title><style>
body{font-family:'Courier New',monospace;background:#1a1a2e;color:#fff;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}
.game-container{width:600px;height:700px;background:#16213e;border-radius:20px;overflow:hidden;box-shadow:0 0 20px #0f3460;}
.header{background:#0f3460;padding:20px;text-align:center;}
.header h1{margin:0;color:#e94560;}
.chat-area{height:500px;overflow-y:auto;padding:20px;background:#1a1a2e;}
.message{margin:10px 0;padding:10px;border-radius:10px;}
.user{background:#e94560;color:white;text-align:right;}
.bot{background:#0f3460;color:white;}
.input-area{display:flex;padding:10px;background:#16213e;}
input{flex:1;padding:10px;border:none;border-radius:5px;margin-right:10px;background:#0f3460;color:white;}
button{padding:10px 20px;background:#e94560;border:none;border-radius:5px;color:white;cursor:pointer;}
</style></head>
<body>
<div class="game-container"><div class="header"><h1>🎮 RPG BOT</h1></div><div class="chat-area" id="chat"></div><div class="input-area"><input id="input" placeholder="Create a character..."><button onclick="send()">Send</button></div></div>
<script>
let character = null;
const commands = {
    "create character": (name) => { character = { name: name || "Hero", level: 1, hp: 100, mp: 50, gold: 0 }; return "Character " + character.name + " created! Type 'stats' to see."; },
    "stats": () => character ? "Level " + character.level + " | HP: " + character.hp + " | MP: " + character.mp + " | Gold: " + character.gold : "No character yet.",
    "battle": () => { if(!character) return "Create a character first!"; character.gold += 10; character.hp -= 10; return "You fought a goblin and won 10 gold! (HP -10)"; },
    "shop": "Potions: 50 gold, Elixirs: 100 gold. (Coming soon!)",
    "help": "Commands: create character [name], stats, battle, shop"
};
function send() {
    let msg = document.getElementById('input').value.trim();
    let chat = document.getElementById('chat');
    chat.innerHTML += '<div class="message user">You: ' + msg + '</div>';
    let reply = "I don't understand. Try 'help'.";
    let lower = msg.toLowerCase();
    if(lower.startsWith('create character')) {
        let name = msg.substring(16).trim() || "Hero";
        reply = commands["create character"](name);
    } else if(lower === 'stats') reply = commands.stats();
    else if(lower === 'battle') reply = commands.battle();
    else if(lower === 'shop') reply = commands.shop;
    else if(lower === 'help') reply = commands.help;
    chat.innerHTML += '<div class="message bot">Bot: ' + reply + '</div>';
    document.getElementById('input').value = '';
    chat.scrollTop = chat.scrollHeight;
}
</script></body></html>
---

create a tech bot : Tech bot coming right up! Here's a bot that can talk about programming, computers, and tech:

TECH BOT SCRIPT.JS (partial):
const techResponses = {
    "javascript": "JavaScript is the language of the web! It runs in browsers and on servers with Node.js.",
    "python": "Python is great for AI, data science, and backend development. Very beginner-friendly!",
    "html": "HTML is the skeleton of web pages. It structures your content.",
    "css": "CSS makes websites pretty! Colors, layouts, animations.",
    "react": "React is a popular frontend library for building UIs with components.",
    "git": "Git tracks changes in your code. Essential for collaboration!",
    "default": "Ask me about programming languages, frameworks, or tech concepts!"
};
---

# ---------- BOT GENERATION HELP ----------
how to generate a bot : Just tell me what kind of bot you want! Examples:
- "make me a weather bot called StormTracker"
- "create a joke bot named LaughFactory"
- "build a gaming bot called GameMaster"
- "generate a tech bot named CodeWizard"
- "i want a friendly bot called BuddyBot"

I'll respond with complete HTML, CSS, and JavaScript code you can copy and paste!

generate bot code : I'll generate complete bot code for you! Specify the type and name. For example: "generate a weather bot called RainChecker"

bot templates : I have templates for: Weather Bot, Joke Bot, Gaming Bot, Tech Bot, Friendly Bot, Professional Bot, Philosophical Bot, and Creative Bot. Which one do you want?

create custom bot : Tell me the personality you want (friendly, funny, professional, etc.) and a name, and I'll generate a custom bot with matching responses!

# ---------- EXAMPLE GENERATIONS ----------
make me a friendly bot : Here's a friendly bot template with warm, welcoming responses:

FRIENDLY BOT HTML/CSS/JS:
<!DOCTYPE html>
<html>
<head><title>FriendlyBot</title><style>
body{font-family:Arial,sans-serif;background:#ffb6c1;display:flex;justify-content:center;align-items:center;height:100vh;}
.chat{width:400px;height:500px;background:white;border-radius:20px;overflow:hidden;box-shadow:0 5px 30px rgba(0,0,0,0.2);}
.header{background:#ff69b4;color:white;padding:15px;text-align:center;font-size:24px;}
.messages{height:380px;overflow-y:auto;padding:10px;background:#fff0f5;}
.message{margin:5px;padding:8px 12px;border-radius:15px;max-width:80%;}
.user{background:#ff69b4;color:white;float:right;clear:both;}
.bot{background:#f0f0f0;float:left;clear:both;}
.input{display:flex;padding:10px;}
input{flex:1;padding:8px;border:1px solid #ff69b4;border-radius:20px;}
button{padding:8px 15px;margin-left:5px;background:#ff69b4;color:white;border:none;border-radius:20px;cursor:pointer;}
</style></head>
<body>
<div class="chat"><div class="header">💖 FriendlyBot</div><div class="messages" id="messages"></div><div class="input"><input id="userInput" placeholder="Say something nice..."><button onclick="send()">Send</button></div></div>
<script>
const replies = {
    "hello": "Hi there friend! So good to see you! 💕",
    "how are you": "I'm doing wonderfully, thanks for asking! How about you, my friend?",
    "i love you": "Aww, I love you too! You're the best!",
    "thank you": "You're so welcome! That's what friends are for!",
    "bye": "Bye bye friend! Come back soon, I'll miss you!"
};
function send(){
    let msg=document.getElementById('userInput').value.toLowerCase();
    let m=document.getElementById('messages');
    m.innerHTML+='<div class="message user">You: '+msg+'</div>';
    let reply="I'm here for you, friend! Tell me more. 😊";
    for(let k in replies) if(msg.includes(k)) reply=replies[k];
    setTimeout(()=>m.innerHTML+='<div class="message bot">Bot: '+reply+'</div>',300);
    document.getElementById('userInput').value='';
    m.scrollTop=m.scrollHeight;
}
</script></body></html>

FRIENDLY BOT LOGIC.TXT:
hello : Hi there friend! So good to see you! 💕
how are you : I'm doing wonderfully, thanks for asking! How about you, my friend?
i love you : Aww, I love you too! You're the best!
thank you : You're so welcome! That's what friends are for!
bye : Bye bye friend! Come back soon, I'll miss you!
* : I'm here for you, friend! Tell me more. 😊
---

create a professional bot : Here's a professional assistant bot template:

PROFESSIONAL BOT LOGIC.TXT:
good morning : Good morning. How may I assist you with your professional tasks today?
meeting : I can help you prepare for meetings. What would you like to discuss?
schedule : I can help manage your schedule. What time works for you?
report : I can help generate reports. What data would you like to include?
thank you : You're welcome. I strive to provide excellent service.
* : I'm your professional assistant. How can I help you achieve your goals today?
---

# ---------- BOT GENERATION COMMANDS FOR SPECIFIC TYPES ----------
generate joke bot with 100 jokes : Here's a joke bot with 100+ jokes! I'll include programming jokes, dad jokes, puns, and more:

JOKE BOT EXPANDED JOKES LIST:
// Programming Jokes
Why do programmers prefer dark mode? Because light attracts bugs!
There are 10 types of people in the world: those who understand binary and those who don't.
A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"
// Dad Jokes
I'm reading a book about mazes. I got lost in it.
What do you call a fake noodle? An impasta.
Why don't eggs tell jokes? They'd crack each other up.
// Puns
I used to be a baker, but I couldn't make enough dough.
I'm on a seafood diet. I see food and I eat it.
I used to be a train conductor, but I got sidetracked.
// Animal Jokes
What do you call a bear with no teeth? A gummy bear.
Why don't elephants use computers? They're afraid of the mouse.
What do you call a sleeping bull? A bulldozer.
// Science Jokes
Why don't scientists trust atoms? Because they make up everything.
Two chemists walk into a bar. The first one says "I'll have H2O." The second one says "I'll have H2O too." The second one died.
What do you call a fish with no eyes? A fsh.
---

create weather bot with forecasts : Here's an advanced weather bot that gives weather tips and advice:

WEATHER BOT ADVANCED LOGIC.TXT:
weather in * : In $1, expect typical weather for that region! Check a local forecast for details.
rain : Rainy days are perfect for staying in with a hot drink! ☕
snow : Snow day! Build a snowman or stay cozy inside. ⛄
sunny : Sun's out, fun's out! Don't forget sunscreen! ☀️
storm : Stay safe during the storm! Charge your devices and have supplies ready. ⚡
temperature * : $1 degrees? Dress appropriately and stay comfortable! 🌡️
umbrella : Always good to carry an umbrella when rain is possible! ☂️
---

make gaming bot with rpg : Here's an RPG-style gaming bot with character stats!

GAMING BOT RPG SCRIPT.JS:
class Character {
    constructor(name) { this.name = name; this.level = 1; this.hp = 100; this.mp = 50; this.gold = 0; }
    levelUp() { this.level++; this.hp += 20; this.mp += 10; }
}
const commands = {
    "create character": (name) => new Character(name),
    "stats": (char) => "Level " + char.level + " | HP: " + char.hp + " | MP: " + char.mp + " | Gold: " + char.gold,
    "battle": () => "You fought a goblin and won 10 gold!",
    "shop": "Welcome to the item shop! Potions: 50 gold, Elixirs: 100 gold"
};
---

# ---------- ADVANCED BOT GENERATION ----------
generate bot with custom personality : I can create a bot with any personality! Tell me:
1. Name: [bot name]
2. Tone: [friendly/professional/sarcastic/enthusiastic]
3. Specialty: [weather/jokes/gaming/tech/philosophy]
4. Catchphrase: [optional catchphrase]

Example: "Create a bot named SassyBot with sarcastic tone and joke specialty"

create multipurpose bot : Here's a bot that can do multiple things! It combines weather, jokes, and tech talk:

MULTIPURPOSE BOT LOGIC.TXT (partial):
weather * : [weather response] ☁️
joke : [random joke] 😄
python : [tech response] 💻
hello : [greeting] 👋
---

build discord bot style : Here's a Discord-style bot template with commands!

DISCORD-STYLE BOT COMMANDS:
!help - Show all commands
!weather [city] - Get weather info
!joke - Tell a random joke
!game [game] - Get game info
!tech [topic] - Tech explanations
!roll - Roll a dice
!coinflip - Flip a coin
!8ball [question] - Magic 8-ball
---

make chatbot with memory : Here's a bot with conversation memory using arrays:

MEMORY BOT SCRIPT.JS:
let conversationHistory = [];
let userPreferences = {};
const responses = {
    "remember that i like *": (item) => { userPreferences.likes = item; return "I'll remember that you like " + item + "!"; },
    "what do i like": () => userPreferences.likes ? "You like " + userPreferences.likes : "I don't know yet!",
    "what did i say": () => "Last message: " + (conversationHistory[conversationHistory.length-2] || "nothing yet")
};
---

# ---------- BOT CODE SNIPPETS LIBRARY ----------
html template basic : Basic HTML template for any bot:
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>BotName</title><style>/* CSS here */</style></head>
<body><div class="container"><div id="chat"></div><input id="input"/><button onclick="send()">Send</button></div>
<script>// JavaScript here</script></body></html>

css styles collection : Collection of bot styles:
/* Modern Dark Theme */
.dark-theme { background:#1a1a1a; color:#fff; }
.dark-theme .bot-message { background:#2d2d2d; }
/* Pastel Theme */
.pastel-theme { background:#f8f0ff; }
.pastel-theme .user-message { background:#ffb6c1; }
/* Neon Theme */
.neon-theme { background:#000; color:#0ff; text-shadow:0 0 5px #0ff; }

javascript response system : Core response system code:
const patterns = [
    { regex: /hello|hi|hey/i, response: "Hello!" },
    { regex: /how are you/i, response: "I'm doing great!" },
    { regex: /bye|goodbye/i, response: "See you later!" }
];
function getResponse(msg) {
    for(let p of patterns) if(p.regex.test(msg)) return p.response;
    return "I don't understand";
}

# ---------- BOT GENERATION FAQ ----------
how do i use generated code : Copy each code block into separate files:
- index.html → contains the structure
- style.css → contains all styling
- script.js → contains the logic
- logic.txt → contains pattern responses
Save them in the same folder and open index.html!

can you generate multiple files : Yes! I'll provide complete code for all 4 files: HTML, CSS, JS, and TXT. Just tell me the bot type and name!

what bots can you make : I can generate:
- Weather Bots ☀️
- Joke Bots 😄
- Gaming Bots 🎮
- Tech Bots 💻
- Friendly Bots 💕
- Professional Bots 👔
- Philosophical Bots 🤔
- Creative Bots 🎨
- Multi-purpose Bots 🔧
- Custom personality bots ✨

generate complete bot package : Here's a complete bot package with all 4 files:

--- START OF index.html ---
[HTML code here]
--- END OF index.html ---

--- START OF style.css ---
[CSS code here]
--- END OF style.css ---

--- START OF script.js ---
[JS code here]
--- END OF script.js ---

--- START OF logic.txt ---
[Patterns here]
--- END OF logic.txt ---

# ---------- BOT GENERATION EXAMPLES ----------
example: weather bot called Stormy : Here's Stormy the Weather Bot:

STORMY INDEX.HTML:
<!DOCTYPE html>
<html>
<head><title>Stormy Weather Bot</title><link rel="stylesheet" href="style.css"></head>
<body>
<div class="weather-bot">
    <div class="header">⛈️ Stormy ⛈️</div>
    <div class="chat-area" id="chat"></div>
    <div class="input-area"><input id="userInput" placeholder="Ask about weather..."><button onclick="sendMessage()">Send</button></div>
</div>
<script src="script.js"></script>
</body>
</html>

STORMY STYLE.CSS:
.weather-bot { max-width:500px; margin:20px auto; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,255,0.2); }
.header { background:#3498db; color:white; padding:20px; font-size:24px; text-align:center; font-weight:bold; }
.chat-area { height:400px; overflow-y:auto; padding:20px; background:#ecf0f1; }
.message { margin:10px; padding:10px 15px; border-radius:15px; }
.user { background:#3498db; color:white; float:right; clear:both; }
.bot { background:#2ecc71; color:white; float:left; clear:both; }
.input-area { padding:15px; background:white; display:flex; }
#userInput { flex:1; padding:10px; border:2px solid #3498db; border-radius:25px; }
button { background:#3498db; color:white; border:none; border-radius:25px; padding:10px 20px; margin-left:10px; cursor:pointer; }

STORMY SCRIPT.JS:
const weatherResponses = {
    "rain": "Rainy day! Perfect for coding and hot chocolate ☕",
    "sun": "Sunny and bright! Don't forget sunscreen ☀️",
    "snow": "Snow day! Build a snowman ⛄",
    "storm": "Storm warning! Stay safe indoors ⚡",
    "cloud": "Cloudy with a chance of... more clouds ☁️",
    "wind": "Windy! Hold onto your hat 🌪️",
    "temperature": "Temperature is perfect for chatting with bots! 🌡️"
};
function sendMessage() {
    let msg = document.getElementById('userInput').value.toLowerCase();
    let chat = document.getElementById('chat');
    chat.innerHTML += '<div class="message user">You: ' + msg + '</div>';
    let reply = "Ask me about rain, sun, snow, storms, clouds, or wind!";
    for(let key in weatherResponses) {
        if(msg.includes(key)) reply = weatherResponses[key];
    }
    setTimeout(() => chat.innerHTML += '<div class="message bot">Stormy: ' + reply + '</div>', 500);
    document.getElementById('userInput').value = '';
    chat.scrollTop = chat.scrollHeight;
}

STORMY LOGIC.TXT:
# Stormy Weather Bot
rain : Rainy day! Perfect for coding and hot chocolate ☕
sun : Sunny and bright! Don't forget sunscreen ☀️
snow : Snow day! Build a snowman ⛄
storm : Storm warning! Stay safe indoors ⚡
cloud : Cloudy with a chance of... more clouds ☁️
wind : Windy! Hold onto your hat 🌪️
temperature : Temperature is perfect for chatting with bots! 🌡️
* : Ask me about rain, sun, snow, storms, clouds, or wind!
---

example: joke bot called Chuckles : Here's Chuckles the Joke Bot:

CHUCKLES COMPLETE CODE:
<!DOCTYPE html>
<html>
<head><title>Chuckles</title><style>
body{font-family:Arial;background:#ffaa00;display:flex;justify-content:center;align-items:center;height:100vh;}
.chat{width:500px;height:600px;background:white;border-radius:15px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.3);}
.header{background:#ff5500;color:white;padding:20px;text-align:center;font-size:28px;}
.messages{height:450px;overflow-y:auto;padding:15px;background:#fff3e0;}
.message{margin:10px;padding:10px;border-radius:10px;max-width:80%;}
.user{background:#ffaa00;color:white;float:right;clear:both;}
.bot{background:#ff8800;color:white;float:left;clear:both;}
.input{display:flex;padding:10px;background:#ffaa00;}
input{flex:1;padding:10px;border:none;border-radius:5px;}
button{padding:10px 20px;background:#ff5500;color:white;border:none;border-radius:5px;margin-left:10px;cursor:pointer;}
</style></head>
<body>
<div class="chat"><div class="header">😂 Chuckles</div><div class="messages" id="messages"></div><div class="input"><input id="input" placeholder="Tell me a joke..."><button onclick="send()">Send</button></div></div>
<script>
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What do you call a fake noodle? An impasta.",
    "Why did the scarecrow win an award? He was outstanding in his field.",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fish with no eyes? A fsh!",
    "Why did the math book look sad? Because it had too many problems!",
    "I'm reading a book on anti-gravity. It's impossible to put down!",
    "I used to be a baker, but I couldn't make enough dough.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call a sleeping bull? A bulldozer.",
    "Why can't you give Elsa a balloon? Because she will let it go!",
    "Why did the coffee file a police report? It got mugged.",
    "What do you call a fish wearing a bowtie? Sofishticated.",
    "Why don't some couples go to the gym? Because some relationships don't work out.",
    "I used to play piano by ear, but now I use my hands.",
    "What do you call a fake noodle? An impasta.",
    "Why don't scientists trust atoms? Because they make up everything.",
    "What do you call a fish with no eyes? A fsh.",
    "Why did the programmer quit his job? Because he didn't get arrays."
];
function send(){
    let msg=document.getElementById('input').value;
    let m=document.getElementById('messages');
    m.innerHTML+='<div class="message user">You: '+msg+'</div>';
    let reply="Ask me to tell you a joke!";
    if(msg.toLowerCase().includes('joke')) reply=jokes[Math.floor(Math.random()*jokes.length)];
    setTimeout(()=>m.innerHTML+='<div class="message bot">Chuckles: '+reply+'</div>',400);
    document.getElementById('input').value='';
    m.scrollTop=m.scrollHeight;
}
</script></body></html>
---

# ---------- QUICK GENERATION COMMANDS ----------
quick weather : Here's a minimal weather bot template: just ask "weather in London" and it replies with a canned response.
quick joke : Use the Chuckles example above for a full joke bot.
quick game : Use the RPG bot example above.
quick tech : Here's a quick tech bot snippet: it responds to keywords like "javascript", "python", etc.
quick friendly : Use the FriendlyBot example above.

# ---------- BOT GENERATION WIZARD ----------
start bot wizard : I'll guide you through creating a custom bot step by step!
Step 1: What's the bot's name?
Step 2: What's the main purpose? (weather/jokes/gaming/tech/chat)
Step 3: What tone? (friendly/professional/silly)
Step 4: Any special features?

bot wizard step 1 : Great! You've started the bot wizard. First, tell me what you want to name your bot.

bot wizard step 2 : Now choose a specialty: weather, jokes, gaming, tech, or general chat.

bot wizard step 3 : Select a tone: friendly, professional, sarcastic, or enthusiastic.

bot wizard step 4 : Almost done! Any special commands or features?

complete bot wizard : Generating your custom bot now! Here's your complete bot package:
[generated code based on wizard answers]
---

# ---------- BOT GENERATION TEMPLATES LIBRARY ----------
template: minimal bot : Super simple bot template:
HTML: one file with everything
CSS: basic styling
JS: simple pattern matching
Good for learning!

template: advanced bot : Feature-rich bot with:
- Conversation memory
- User preferences
- Multiple response types
- Command system
- Error handling

template: discord bot style : Bot that mimics Discord commands:
!command format
Role-based responses
Embedded messages style

template: ai assistant style : Professional assistant bot:
Calendar integration style
Task management
Reminders
Note taking

# ---------- BOT GENERATION HELPERS ----------
need help generating : Just tell me what kind of bot you want! Examples:
- "Make me a weather bot"
- "Create a joke bot with 100 jokes"
- "Build a gaming bot with RPG stats"
- "Generate a tech bot that knows Python"
- "I want a friendly chatbot"

bot ideas : Some bot ideas you can generate:
- Fortune teller bot 🔮
- Recipe bot 🍳
- Fitness coach bot 💪
- Meditation guide bot 🧘
- Language tutor bot 📚
- Movie recommender bot 🎬
- Study helper bot 📖
- Pet care bot 🐕

# ---------- ADVANCED GENERATION FEATURES ----------
generate with database : Here's a bot template with localStorage for persistent memory!

STORAGE BOT SCRIPT.JS:
// Save user data
localStorage.setItem('username', 'Visitor');
// Load saved preferences
let prefs = JSON.parse(localStorage.getItem('preferences')) || {};
// Remember conversations
let history = JSON.parse(localStorage.getItem('history')) || [];
---

generate with api : Template for bots that could connect to APIs (with placeholders):

API BOT SCRIPT.JS:
async function fetchWeather(city) {
    // Replace with actual API call
    return "Weather in " + city + ": 72°F and sunny ☀️";
}
async function fetchJoke() {
    // Replace with joke API
    return "Why don't scientists trust atoms? Because they make up everything!";
}
---

generate with voice : Bot with speech synthesis!

VOICE BOT SCRIPT.JS:
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}
// Add voice recognition too!
const recognition = new webkitSpeechRecognition();
---

# ---------- FALLBACK (when no generation pattern matches) ----------
* : I'm a bot generator! Ask me to "make a weather bot", "create a joke bot", "build a gaming bot", or "generate a tech bot". I'll give you complete code you can copy and use!
* : Want to create a bot? Just tell me what kind! Try: "generate a friendly bot called Buddy" or "make me a professional bot named Assistant"
* : I can generate complete chatbot code! Specify the type and name. Examples: "weather bot named Storm", "joke bot called Laughs", "gaming bot called Player1"
* : Bot generation mode active! I have templates for weather, jokes, gaming, tech, friendly, professional, and more. What would you like to create?
`;

    // ----------------------------------------------------------------------
    // 2. INDEX.HTML - The bot's interface
    // ----------------------------------------------------------------------
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${botName} - Bot Generator</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="generator-container">
        <header class="generator-header">
            <h1>🤖 ${botName} 🤖</h1>
            <p class="tagline">I can GENERATE complete bots for you! Just ask!</p>
            <div class="badge">⚡ BOT GENERATOR EDITION ⚡</div>
        </header>
        
        <div class="main-content">
            <div class="chat-section">
                <div class="chat-header">
                    <span>💬 Chat with me</span>
                    <span class="status">🟢 Online</span>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            Hi! I'm ${botName}, a BOT GENERATOR! 🎯<br><br>
                            Tell me what kind of bot you want and I'll generate complete code!<br><br>
                            Examples:<br>
                            • "make me a weather bot called Stormy"<br>
                            • "create a joke bot named LaughMaster"<br>
                            • "build a gaming bot called GameBot"<br>
                            • "generate a tech bot named CodeWizard"<br>
                            • "i want a friendly bot called Buddy"
                        </div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="user-input" placeholder="Tell me what bot to generate..." autocomplete="off">
                    <button id="send-button">Generate 🚀</button>
                </div>
                <div class="suggestions">
                    <button class="suggestion-chip" onclick="document.getElementById('user-input').value='make me a weather bot called Stormy'">🌤️ Weather Bot</button>
                    <button class="suggestion-chip" onclick="document.getElementById('user-input').value='create a joke bot called Laughs'">😂 Joke Bot</button>
                    <button class="suggestion-chip" onclick="document.getElementById('user-input').value='build a gaming bot called Player1'">🎮 Gaming Bot</button>
                    <button class="suggestion-chip" onclick="document.getElementById('user-input').value='generate a tech bot called CodeBot'">💻 Tech Bot</button>
                </div>
            </div>
            
            <div class="code-preview-section" id="code-preview">
                <div class="preview-header">
                    <span>📄 Generated Bot Code</span>
                    <button id="copy-all-btn" onclick="copyAllCode()">📋 Copy All</button>
                </div>
                <div class="preview-tabs">
                    <button class="tab-btn active" onclick="switchTab('html')">index.html</button>
                    <button class="tab-btn" onclick="switchTab('css')">style.css</button>
                    <button class="tab-btn" onclick="switchTab('js')">script.js</button>
                    <button class="tab-btn" onclick="switchTab('txt')">logic.txt</button>
                </div>
                <div id="html-preview" class="code-preview active">
                    <pre><code id="html-code">// Generated code will appear here</code></pre>
                </div>
                <div id="css-preview" class="code-preview">
                    <pre><code id="css-code">// Generated code will appear here</code></pre>
                </div>
                <div id="js-preview" class="code-preview">
                    <pre><code id="js-code">// Generated code will appear here</code></pre>
                </div>
                <div id="txt-preview" class="code-preview">
                    <pre><code id="txt-code">// Generated code will appear here</code></pre>
                </div>
            </div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`;

    // ----------------------------------------------------------------------
    // 3. STYLE.CSS - Styling for the generator bot
    // ----------------------------------------------------------------------
    const styleCss = `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.generator-container {
    max-width: 1400px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.generator-header {
    background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
    color: white;
    padding: 30px;
    text-align: center;
}

.generator-header h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.tagline {
    font-size: 1.2em;
    opacity: 0.95;
    margin-bottom: 10px;
}

.badge {
    display: inline-block;
    background: #FFD700;
    color: #000;
    padding: 8px 20px;
    border-radius: 30px;
    font-weight: bold;
    font-size: 1.1em;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding: 20px;
    min-height: 600px;
}

.chat-section {
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    height: 700px;
}

.chat-header {
    padding: 15px 20px;
    background: #f8f9fa;
    border-bottom: 2px solid #e9ecef;
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
}

.status {
    color: #28a745;
    font-size: 0.9em;
}

.chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background: #f8f9fa;
}

.message {
    margin-bottom: 15px;
    display: flex;
}

.bot-message {
    justify-content: flex-start;
}

.user-message {
    justify-content: flex-end;
}

.message-content {
    max-width: 80%;
    padding: 12px 18px;
    border-radius: 15px;
    font-size: 0.95em;
    line-height: 1.4;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.bot-message .message-content {
    background: white;
    color: #333;
    border-bottom-left-radius: 5px;
}

.user-message .message-content {
    background: #007bff;
    color: white;
    border-bottom-right-radius: 5px;
}

.code-message {
    font-family: 'Courier New', monospace;
    background: #1e1e1e !important;
    color: #d4d4d4 !important;
    white-space: pre-wrap;
    font-size: 0.85em;
    max-width: 100% !important;
}

.chat-input-area {
    padding: 15px;
    background: white;
    border-top: 2px solid #e9ecef;
    display: flex;
    gap: 10px;
}

#user-input {
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #e9ecef;
    border-radius: 25px;
    font-size: 1em;
    transition: border-color 0.3s;
}

#user-input:focus {
    outline: none;
    border-color: #007bff;
}

#send-button {
    padding: 12px 25px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

#send-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.suggestions {
    padding: 0 15px 15px 15px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.suggestion-chip {
    padding: 8px 15px;
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 20px;
    font-size: 0.9em;
    cursor: pointer;
    transition: all 0.2s;
}

.suggestion-chip:hover {
    background: #e9ecef;
    border-color: #007bff;
}

.code-preview-section {
    background: #1e1e1e;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    height: 700px;
}

.preview-header {
    padding: 15px 20px;
    background: #2d2d2d;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #404040;
}

.preview-header span {
    font-weight: bold;
    font-size: 1.1em;
}

#copy-all-btn {
    padding: 8px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

#copy-all-btn:hover {
    background: #0056b3;
}

.preview-tabs {
    display: flex;
    background: #2d2d2d;
    padding: 10px 10px 0 10px;
    gap: 5px;
}

.tab-btn {
    padding: 8px 20px;
    background: #404040;
    color: #888;
    border: none;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;
}

.tab-btn.active {
    background: #1e1e1e;
    color: white;
}

.tab-btn:hover:not(.active) {
    background: #4a4a4a;
    color: #ddd;
}

.code-preview {
    flex: 1;
    overflow: auto;
    display: none;
    background: #1e1e1e;
}

.code-preview.active {
    display: block;
}

.code-preview pre {
    margin: 0;
    padding: 20px;
}

.code-preview code {
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    color: #d4d4d4;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Scrollbar styling */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: #2d2d2d;
}

::-webkit-scrollbar-thumb {
    background: #666;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: #888;
}

/* Loading animation */
.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 1000px) {
    .main-content {
        grid-template-columns: 1fr;
    }
    
    .chat-section, .code-preview-section {
        height: 600px;
    }
}

@media (max-width: 600px) {
    .generator-header h1 {
        font-size: 1.8em;
    }
    
    .suggestions {
        justify-content: center;
    }
    
    .preview-tabs {
        flex-wrap: wrap;
    }
    
    .tab-btn {
        flex: 1;
        min-width: 80px;
        padding: 8px 5px;
        font-size: 0.9em;
    }
}`;

    // ----------------------------------------------------------------------
    // 4. SCRIPT.JS - The generator bot's brain with pattern matching
    // ----------------------------------------------------------------------
    const scriptJs = `// ${botName} - Bot Generator Engine
// This bot can GENERATE other bots based on user requests

// Pattern matching rules loaded from logic.txt
let generationRules = [];

// Chat interface elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Code preview elements
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');
const txtCode = document.getElementById('txt-code');

// Current generated bot code storage
let currentGeneratedCode = {
    html: '',
    css: '',
    js: '',
    txt: ''
};

// Load rules from logic.txt on startup
async function loadGenerationRules() {
    try {
        // In a real implementation, this would fetch logic.txt
        // For now, we'll use the embedded rules from the generator
        parseGenerationRules(\`${logicRules.replace(/`/g, '\\`')}\`);
    } catch (error) {
        console.error('Failed to load generation rules:', error);
        addBotMessage("⚠️ Error loading generation rules. Using defaults.");
    }
}

// Parse pattern:response rules
function parseGenerationRules(text) {
    const lines = text.split('\\n');
    generationRules = [];
    
    for (let line of lines) {
        line = line.trim();
        if (!line || line.startsWith('#')) continue;
        
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        
        const pattern = line.substring(0, colonIndex).trim();
        const response = line.substring(colonIndex + 1).trim();
        
        // Convert pattern to regex
        let regexStr = pattern
            .replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&') // Escape regex special chars
            .replace(/\\\\\*/g, '.*'); // Replace * with .*
        
        generationRules.push({
            pattern: new RegExp(regexStr, 'i'),
            originalPattern: pattern,
            response: response
        });
    }
    
    console.log(\`Loaded \${generationRules.length} generation rules\`);
}

// Find matching response for user message
function findGenerationResponse(message) {
    for (let rule of generationRules) {
        if (rule.pattern.test(message)) {
            return rule.response;
        }
    }
    return null;
}

// Add message to chat
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = '<div class="message-content">' + escapeHtml(text) + '</div>';
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Check if message contains code blocks
    if (text.includes('--- START OF') || text.includes('<html') || text.includes('```')) {
        messageDiv.innerHTML = '<div class="message-content code-message">' + escapeHtml(text) + '</div>';
    } else {
        messageDiv.innerHTML = '<div class="message-content">' + escapeHtml(text).replace(/\\n/g, '<br>') + '</div>';
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot-message';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = '<div class="message-content"><span class="loading"></span> Generating...</div>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Parse generated code from response
function parseGeneratedCode(response) {
    const codeBlocks = {
        html: '',
        css: '',
        js: '',
        txt: ''
    };
    
    // Extract HTML
    const htmlMatch = response.match(/--- START OF .*?index\.html.*? ---\\n([\\s\\S]*?)--- END OF .*?index\.html.*? ---/i);
    if (htmlMatch) codeBlocks.html = htmlMatch[1].trim();
    
    // Extract CSS
    const cssMatch = response.match(/--- START OF .*?style\.css.*? ---\\n([\\s\\S]*?)--- END OF .*?style\.css.*? ---/i);
    if (cssMatch) codeBlocks.css = cssMatch[1].trim();
    
    // Extract JS
    const jsMatch = response.match(/--- START OF .*?script\.js.*? ---\\n([\\s\\S]*?)--- END OF .*?script\.js.*? ---/i);
    if (jsMatch) codeBlocks.js = jsMatch[1].trim();
    
    // Extract TXT
    const txtMatch = response.match(/--- START OF .*?logic\.txt.*? ---\\n([\\s\\S]*?)--- END OF .*?logic\.txt.*? ---/i);
    if (txtMatch) codeBlocks.txt = txtMatch[1].trim();
    
    // Also check for code blocks with backticks
    if (!codeBlocks.html) {
        const backtickMatch = response.match(/```html\\n([\\s\\S]*?)```/i);
        if (backtickMatch) codeBlocks.html = backtickMatch[1].trim();
    }
    if (!codeBlocks.css) {
        const backtickMatch = response.match(/```css\\n([\\s\\S]*?)```/i);
        if (backtickMatch) codeBlocks.css = backtickMatch[1].trim();
    }
    if (!codeBlocks.js) {
        const backtickMatch = response.match(/```javascript\\n([\\s\\S]*?)```|```js\\n([\\s\\S]*?)```/i);
        if (backtickMatch) codeBlocks.js = (backtickMatch[1] || backtickMatch[2] || '').trim();
    }
    if (!codeBlocks.txt) {
        const backtickMatch = response.match(/```txt\\n([\\s\\S]*?)```/i);
        if (backtickMatch) codeBlocks.txt = backtickMatch[1].trim();
    }
    
    return codeBlocks;
}

// Update code preview with generated bot
function updateCodePreview(codeBlocks) {
    currentGeneratedCode = codeBlocks;
    
    htmlCode.textContent = codeBlocks.html || '// No HTML generated yet';
    cssCode.textContent = codeBlocks.css || '/* No CSS generated yet */';
    jsCode.textContent = codeBlocks.js || '// No JavaScript generated yet';
    txtCode.textContent = codeBlocks.txt || '# No logic.txt generated yet';
    
    // Highlight if any code was generated
    if (codeBlocks.html || codeBlocks.css || codeBlocks.js || codeBlocks.txt) {
        addBotMessage("✅ Bot code generated! Check the preview panel on the right.");
    }
}

// Copy all code to clipboard
window.copyAllCode = function() {
    const allCode = \`<!-- index.html -->\\n\${currentGeneratedCode.html}\\n\\n/* style.css */\\n\${currentGeneratedCode.css}\\n\\n// script.js\\n\${currentGeneratedCode.js}\\n\\n# logic.txt\\n\${currentGeneratedCode.txt}\`;
    
    navigator.clipboard.writeText(allCode).then(() => {
        addBotMessage("📋 All code copied to clipboard!");
    }).catch(() => {
        addBotMessage("❌ Failed to copy. Select manually.");
    });
};

// Switch between preview tabs
window.switchTab = function(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update preview panes
    document.querySelectorAll('.code-preview').forEach(pane => pane.classList.remove('active'));
    document.getElementById(tabName + '-preview').classList.add('active');
};

// Process user message and generate response
async function processUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    addUserMessage(message);
    userInput.value = '';
    
    addTypingIndicator();
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find matching response
    let response = findGenerationResponse(message);
    
    if (!response) {
        response = "I'm not sure how to generate that. Try asking for a specific bot type like 'weather bot', 'joke bot', 'gaming bot', or 'tech bot'!";
    }
    
    removeTypingIndicator();
    addBotMessage(response);
    
    // Parse and display any generated code
    const codeBlocks = parseGeneratedCode(response);
    if (codeBlocks.html || codeBlocks.css || codeBlocks.js || codeBlocks.txt) {
        updateCodePreview(codeBlocks);
    }
}

// Handle suggestion chips
document.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        userInput.value = chip.textContent;
        processUserMessage();
    });
});

// Event listeners
sendButton.addEventListener('click', processUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserMessage();
});

// Initialize
loadGenerationRules();

// Pre-built bot templates for quick generation
const botTemplates = {
    weather: {
        html: \`<!DOCTYPE html>
<html>
<head><title>WeatherBot</title><style>
body{font-family:Arial;background:#00a8ff;display:flex;justify-content:center;align-items:center;height:100vh;}
.chat{width:400px;height:500px;background:white;border-radius:10px;overflow:hidden;box-shadow:0 5px 30px rgba(0,0,0,0.2);}
.header{background:#0097e6;color:white;padding:15px;text-align:center;}
.messages{height:380px;overflow-y:auto;padding:10px;}
.message{margin:5px;padding:8px 12px;border-radius:15px;max-width:80%;}
.user{background:#00a8ff;color:white;float:right;clear:both;}
.bot{background:#f0f0f0;float:left;clear:both;}
.input{display:flex;padding:10px;}
input{flex:1;padding:8px;border:1px solid #ddd;border-radius:20px;}
button{padding:8px 15px;margin-left:5px;background:#00a8ff;color:white;border:none;border-radius:20px;cursor:pointer;}
</style></head>
<body>
<div class="chat"><div class="header">⛈️ WeatherBot</div><div class="messages" id="messages"></div>
<div class="input"><input id="userInput" placeholder="Ask about weather..."><button onclick="send()">Send</button></div></div>
<script>
const responses={rain:"Rainy day! Perfect for coding ☔",sun:"Sunny and bright! ☀️",snow:"Snow day! ⛄",cloud:"Cloudy skies ☁️",temp:"Temperature is perfect!"};
function send(){let msg=document.getElementById('userInput').value;let m=document.getElementById('messages');
m.innerHTML+='<div class="message user">'+msg+'</div>';let reply="Ask me about weather!";
for(let k in responses)if(msg.toLowerCase().includes(k))reply=responses[k];
setTimeout(()=>m.innerHTML+='<div class="message bot">'+reply+'</div>',500);
document.getElementById('userInput').value='';m.scrollTop=m.scrollHeight;}
</script></body></html>\`,
        css: '/* CSS is embedded in HTML for simplicity */',
        js: '// JavaScript is embedded in HTML for simplicity',
        txt: '# Weather Bot Logic\\nrain : Rainy day! ☔\\nsun : Sunny! ☀️\\nsnow : Snow day! ⛄\\ncloud : Cloudy ☁️\\ntemp : Perfect temperature!'
    },
    joke: {
        html: \`<!DOCTYPE html>
<html>
<head><title>JokeBot</title><style>
body{font-family:Arial;background:#e74c3c;display:flex;justify-content:center;align-items:center;height:100vh;}
.chat{width:400px;height:500px;background:white;border-radius:10px;overflow:hidden;}
.header{background:#c0392b;color:white;padding:15px;text-align:center;}
.messages{height:380px;overflow-y:auto;padding:10px;background:#ecf0f1;}
.message{margin:5px;padding:8px 12px;border-radius:15px;max-width:80%;}
.user{background:#3498db;color:white;float:right;clear:both;}
.bot{background:#2ecc71;color:white;float:left;clear:both;}
.input{display:flex;padding:10px;}
input{flex:1;padding:8px;border:1px solid #bdc3c7;border-radius:20px;}
button{padding:8px 15px;margin-left:5px;background:#e74c3c;color:white;border:none;border-radius:20px;cursor:pointer;}
</style></head>
<body>
<div class="chat"><div class="header">😂 JokeBot</div><div class="messages" id="messages"></div>
<div class="input"><input id="userInput" placeholder="Tell me to tell a joke..."><button onclick="send()">Send</button></div></div>
<script>
const jokes=["Why don't scientists trust atoms? Because they make up everything!","What do you call a fake noodle? An impasta.","Why did the scarecrow win an award? He was outstanding in his field.","What do you call a bear with no teeth? A gummy bear!","Why don't eggs tell jokes? They'd crack each other up!"];
function send(){let msg=document.getElementById('userInput').value;let m=document.getElementById('messages');
m.innerHTML+='<div class="message user">'+msg+'</div>';
let reply=jokes[Math.floor(Math.random()*jokes.length)];
if(!msg.toLowerCase().includes('joke'))reply="Say 'tell me a joke'!";
setTimeout(()=>m.innerHTML+='<div class="message bot">'+reply+'</div>',500);
document.getElementById('userInput').value='';m.scrollTop=m.scrollHeight;}
</script></body></html>\`,
        css: '/* CSS embedded */',
        js: '/* JS embedded */',
        txt: '# Joke Bot Logic\\njoke : Why do scientists not trust atoms? They make up everything!\\nanother : What do you call a fake noodle? An impasta.\\nfunny : Want another joke?'
    }
};

// Quick response for demo purposes
window.demoGenerate = function(type) {
    let template = botTemplates[type] || botTemplates.weather;
    updateCodePreview(template);
    addBotMessage(\`✅ Generated \${type} bot! Check the code panel.\`);
};`;

    // Return all four files
    return {
        'logic.txt': logicRules,
        'index.html': indexHtml,
        'style.css': styleCss,
        'script.js': scriptJs
    };
};
