class AIAssistant {
    constructor() {
        // Initialize without API key first
        this.apiKey = null;
        this.messages = document.getElementById('messages');
        this.userInput = document.getElementById('userInput');
        this.sendButton = document.getElementById('sendButton');
        this.loading = document.getElementById('loading');
        
        this.initializeEventListeners();
        this.loadApiKey();
    }
    
    async loadApiKey() {
        try {
            // Try to get API key from Netlify function first
            const response = await fetch('/.netlify/functions/get-api-key');
            if (response.ok) {
                const data = await response.json();
                if (data.apiKey) {
                    this.apiKey = data.apiKey;
                    console.log('API key loaded from Netlify function');
                    return;
                } else {
                    console.error('No API key in Netlify function response');
                }
            } else {
                console.error('Netlify function returned error:', response.status);
            }
        } catch (error) {
            console.error('Error calling Netlify function:', error);
        }
        
        // Fallback to config for local development
        if (typeof CONFIG !== 'undefined' && CONFIG.OPENAI_API_KEY) {
            this.apiKey = CONFIG.OPENAI_API_KEY;
            console.log('Using API key from config (local development)');
        } else {
            console.error('CONFIG not defined or API key not found');
            this.apiKey = null;
        }
    }
    
    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;
        
        // Check if API key is loaded
        if (!this.apiKey) {
            this.addMessage('Loading API key, please wait...', 'ai');
            await this.loadApiKey();
            if (!this.apiKey) {
                this.addMessage('Error: API key not available. Please check your configuration.', 'ai');
                return;
            }
        }
        
        // Add user message to chat
        this.addMessage(message, 'user');
        this.userInput.value = '';
        
        // Show loading
        this.showLoading(true);
        
        try {
            const response = await this.callOpenAI(message);
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        } finally {
            this.showLoading(false);
        }
    }
    
    async callOpenAI(userMessage) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant that answers general questions. Be concise, accurate, and friendly. If asked about the current date, provide today\'s date. If asked about geography, provide accurate information.'
                    },
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    }
    
    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Format the message content
        if (typeof content === 'string') {
            messageContent.innerHTML = this.formatMessage(content);
        } else {
            messageContent.innerHTML = content;
        }
        
        messageDiv.appendChild(messageContent);
        this.messages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.messages.scrollTop = this.messages.scrollHeight;
    }
    
    formatMessage(content) {
        // Convert line breaks to HTML
        return content.replace(/\n/g, '<br>');
    }
    
    showLoading(show) {
        this.loading.style.display = show ? 'flex' : 'none';
        this.sendButton.disabled = show;
        this.userInput.disabled = show;
    }
}

// Initialize the AI Assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure all scripts are loaded
    setTimeout(() => {
        new AIAssistant();
    }, 100);
});
