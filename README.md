# API Test Project

This project contains two main components: a simple profile page and an AI assistant that answers general questions.

## Components

### 1. Profile Page (`index.html`)
A clean and modern static profile page built with HTML and CSS.

**Features:**
- Responsive design for all devices
- Modern UI with gradient backgrounds and hover effects
- Profile sections: picture, about me, skills, contact info
- No dependencies - pure HTML and CSS

### 2. AI Assistant (`ai-assistant.html`)
An interactive AI assistant powered by OpenAI's GPT-3.5-turbo that can answer general questions.

**Features:**
- Real-time chat interface
- OpenAI API integration
- Responsive design
- Loading animations
- Secure API key handling

## Files

### Profile Page
- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design

### AI Assistant
- `ai-assistant.html` - AI chat interface
- `ai-assistant.js` - JavaScript for OpenAI API integration
- `ai-styles.css` - CSS styling for the chat interface
- `config.js` - API configuration (⚠️ Contains API key)

### Security
- `.gitignore` - Protects sensitive files from version control
- `README.md` - This documentation

## Setup Instructions

### For the Profile Page
1. Open `index.html` in any modern web browser
2. Customize content by editing the HTML file

### For the AI Assistant
1. **Important**: The API key is currently hardcoded in `config.js` for testing
2. For production, create a `.env` file with:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```
3. Open `ai-assistant.html` in a modern web browser
4. Start asking questions!

## Security Notes

⚠️ **Important Security Information:**
- The OpenAI API key is currently in `config.js` for testing purposes
- For production deployment, move the API key to environment variables
- The `.gitignore` file is configured to protect sensitive files
- Never commit API keys to version control

## Example Questions for AI Assistant

- "What date is today?"
- "Is Monaco in Europe?"
- "What's the capital of Japan?"
- "How many days are in February?"
- "What's the population of Canada?"
- "Tell me about the solar system"

## Customization

### Profile Page
- Replace placeholder image URL
- Update personal information
- Modify colors in CSS
- Add/remove sections

### AI Assistant
- Change the system prompt in `ai-assistant.js`
- Modify the UI colors in `ai-styles.css`
- Adjust response length with `max_tokens` parameter

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
