# Dynamic Chatbot API Setup

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in your project root with your API key:

```env
# OpenAI API Key (for GPT models)
VITE_OPENAI_API_KEY=your-actual-openai-api-key-here

# Alternative: Anthropic API Key (for Claude models)
VITE_ANTHROPIC_API_KEY=your-actual-anthropic-api-key-here
```

### 2. Get API Keys

#### OpenAI API Key:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

#### Anthropic API Key (Alternative):
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Create an API key
4. Copy the key and paste it in your `.env` file

### 3. Features

The dynamic chatbot now includes:

- ✅ **Real AI Integration**: Connects to OpenAI GPT or Anthropic Claude
- ✅ **Conversation History**: Maintains context across messages
- ✅ **Typing Indicators**: Shows when AI is processing
- ✅ **Auto-scroll**: Automatically scrolls to new messages
- ✅ **Error Handling**: Graceful error handling for API failures
- ✅ **Keyboard Shortcuts**: Enter to send messages
- ✅ **Responsive Design**: Works on all devices

### 4. API Configuration

You can modify the API settings in `src/config/api.js`:

```javascript
export const API_CONFIG = {
  MODEL: 'gpt-3.5-turbo',        // Change model
  MAX_TOKENS: 1000,             // Adjust response length
  TEMPERATURE: 0.7,             // Adjust creativity (0-1)
  SYSTEM_PROMPT: '...'          // Customize AI personality
};
```

### 5. Testing

1. Start your development server: `npm run dev`
2. Open the chatbot
3. Type a message and press Enter
4. The AI should respond with real, contextual answers

### 6. Troubleshooting

- **API Key Error**: Make sure your API key is correct and has sufficient credits
- **CORS Error**: The API calls are made from the frontend - ensure your API key allows frontend usage
- **Rate Limiting**: If you hit rate limits, the chatbot will show an error message

### 7. Customization

You can customize:
- AI personality via `SYSTEM_PROMPT`
- Response length via `MAX_TOKENS`
- Model selection (GPT-3.5, GPT-4, Claude, etc.)
- Error messages and fallback responses
