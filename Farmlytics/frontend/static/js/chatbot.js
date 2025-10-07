// --- Configuration ---
// Make sure this URL matches where your Flask backend is running
const FLASK_CHATBOT_URL = 'http://127.0.0.1:5000/chatbot'; 

const chatContainer = document.getElementById('chatContainer');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// --- Widget Toggle Function ---
chatToggleBtn.addEventListener('click', () => {
    if (chatContainer.style.display === 'flex') {
        chatContainer.style.display = 'none';
        chatToggleBtn.innerHTML = '💬';
    } else {
        chatContainer.style.display = 'flex';
        chatToggleBtn.innerHTML = '✖'; // Change icon to close
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom on open
    }
});

// --- UI Helper Functions ---

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    // Replace newline characters with <br> for HTML rendering, while relying on CSS for structure
    messageDiv.innerHTML = message.replace(/\n/g, '<br>');
    
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleLoading(isLoading) {
    sendButton.disabled = isLoading;
    sendButton.textContent = isLoading ? '...' : 'Send';
    userInput.disabled = isLoading;
}

// --- Core Chatbot Logic (Sends message to Flask) ---

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // 1. Display user message
    appendMessage('user', message);
    userInput.value = '';
    toggleLoading(true);

    // 2. Call Flask backend
    try {
        const res = await fetch(FLASK_CHATBOT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        // 3. Display bot reply
        appendMessage('bot', data.reply);

    } catch (err) {
        console.error("Error communicating with the chatbot backend:", err);
        appendMessage('bot', `🚨 Error: Could not reach the server. Ensure your Flask backend is running at ${FLASK_CHATBOT_URL}.`);
    } finally {
        toggleLoading(false);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// --- Event Handlers ---

function handleKeyPress(event) {
    if (event.key === 'Enter' && !sendButton.disabled) {
        sendMessage();
    }
}

document.getElementById('userInput').addEventListener('keydown', handleKeyPress);
