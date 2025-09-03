// API Configuration
export const API_CONFIG = {
  // Replace with your actual API endpoint and key
  OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here',
  
  // Google AI API (Gemini 1.5 Flash) - using v1beta API
  GOOGLE_API_URL: import.meta.env.VITE_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBOjMFgwf6PhO3VACrRPgWTHhbrFFit_wU',
  
  // Alternative: Use a different AI service
  // ANTHROPIC_API_URL: 'https://api.anthropic.com/v1/messages',
  // ANTHROPIC_API_KEY: import.meta.env.VITE_ANTHROPIC_API_KEY || 'your-api-key-here',
  
  // Model configuration
  MODEL: 'gpt-3.5-turbo',
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
  
  // System prompt for the AI
  SYSTEM_PROMPT: `You are a helpful AI assistant. You provide clear, concise, and accurate responses to user questions. 
  You are friendly, professional, and always try to be helpful. If you don't know something, you say so rather than making things up.`
};

// API Service Functions
export const apiService = {
  // Send message to AI API
  async sendMessage(message, conversationHistory = []) {
    try {
      // Check if Google API URL is provided
      if (API_CONFIG.GOOGLE_API_URL.includes('gemini-1.5-flash')) {
        // Use Google AI (Gemini Pro)
        return await this.sendMessageGoogle(message, conversationHistory);
      }
      
      // Check if OpenAI API key is set to default value
      if (API_CONFIG.OPENAI_API_KEY === 'your-api-key-here') {
        // Use mock response for testing
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
        const mockResponses = {
          'hi': "Hello! 👋 I'm here to help you with any questions or tasks you might have. What would you like to know or discuss today?",
          'hello': "Hi there! 😊 How can I assist you today? I'm ready to help with questions, explanations, or just have a conversation.",
          'how are you': "I'm functioning perfectly, thank you for asking! 😊 I'm always ready to help and learn. How are you doing today?",
          'what is your name': "I'm an AI assistant, but you can call me whatever you'd like! Some people call me Assistant, AI Helper, or just Chat. What would you prefer to call me?",
          'what can you do': "I can help you with a wide variety of tasks! I can answer questions, explain concepts, help with problem-solving, provide information on many topics, assist with writing and analysis, and engage in meaningful conversations. I'm particularly good at explaining complex topics in simple terms. What specific area would you like to explore?",
          'tell me about abdul kalam': "Dr. APJ Abdul Kalam was an extraordinary Indian scientist and leader who served as the 11th President of India (2002-2007). Known as the 'People's President' and 'Missile Man of India,' he made significant contributions to India's space and missile programs. He was born in 1931 in Rameswaram, Tamil Nadu, and came from a humble background. His work at ISRO and DRDO helped establish India as a space power. Beyond his scientific achievements, he was a great teacher and inspiration to millions of students, often emphasizing the importance of dreams and hard work. His famous quote 'Dream, dream, dream. Dreams transform into thoughts and thoughts result in action' continues to motivate people worldwide.",
          'weather': "I'd love to help you with weather information! However, I don't have access to real-time weather data. For current weather conditions, I'd recommend checking a weather app like Weather.com, AccuWeather, or your device's built-in weather feature. Is there anything else I can help you with regarding weather patterns or climate-related questions?",
          'time': "I can't provide real-time information like current time, but I can help you with time-related questions! I can explain time zones, help with time calculations, discuss the history of timekeeping, or help you understand concepts like daylight saving time. What specific time-related question do you have?",
          'joke': "Here's a classic one: Why don't scientists trust atoms? Because they make up everything! 😄 Or how about this: What do you call a bear with no teeth? A gummy bear! 🐻 What's your favorite type of joke?",
          'thank you': "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to know or discuss? I'm here whenever you need assistance!",
          'bye': "Goodbye! 👋 It was great chatting with you. Feel free to come back anytime if you have more questions or just want to talk. Take care!",
          'goodbye': "See you later! 👋 Have a wonderful day ahead. Don't hesitate to return if you need any help!",
          'help': "I'm here to help! 🤝 I can assist you with answering questions, explaining concepts, solving problems, providing information on various topics, helping with writing and analysis, and engaging in conversations. What specific area would you like help with?",
          'who are you': "I'm an AI assistant designed to be helpful, informative, and engaging! I can process information, answer questions, explain complex topics, assist with problem-solving, and engage in meaningful conversations. I aim to be accurate, helpful, and friendly in all our interactions. What would you like to know about my capabilities?",
          'default': "That's an interesting question! I'd be happy to help you with that. Could you please provide more specific details so I can give you a more accurate and helpful response?"
        };
        
        const lowerMessage = message.toLowerCase();
        
        // Check for exact matches first
        if (mockResponses[lowerMessage]) {
          return mockResponses[lowerMessage];
        }
        
        // Check for partial matches
        for (const [key, response] of Object.entries(mockResponses)) {
          if (key !== 'default' && lowerMessage.includes(key)) {
            return response;
          }
        }
        
        // Generate contextual responses for common questions
        if (lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
          const responses = [
            "That's a great question! I'd be happy to help you with that. Could you please provide more specific details so I can give you a comprehensive and accurate answer?",
            "Interesting question! To give you the best possible answer, could you elaborate a bit more on what you're looking for?",
            "I'd love to help you with that! To provide you with the most relevant information, could you share a bit more context?"
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.includes('can you')) {
          const responses = [
            "I'd be happy to help! I can assist with various tasks and questions. What specifically would you like me to help you with?",
            "Absolutely! I'm here to help. Could you tell me more about what you'd like me to do?",
            "Of course! I'm ready to assist. What particular task or question do you have in mind?"
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        }
        
        if (lowerMessage.length < 10) {
          const responses = [
            "I see you've sent a short message. I'm here to help! Could you please tell me more about what you'd like to know or how I can assist you?",
            "Hi there! I'd love to help you. Could you share a bit more about what you're looking for?",
            "Hello! I'm ready to assist. What would you like to know or discuss?"
          ];
          return responses[Math.floor(Math.random() * responses.length)];
        }
        
        // Add more intelligent responses for common topics
        if (lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('coding')) {
          return "I'd be happy to help you with programming! I can assist with various programming languages, debugging, best practices, and coding concepts. What specific programming question or topic would you like to explore?";
        }
        
        if (lowerMessage.includes('math') || lowerMessage.includes('mathematics') || lowerMessage.includes('calculation')) {
          return "I can help you with mathematics! I can assist with calculations, explain mathematical concepts, help solve problems, and provide step-by-step explanations. What specific math question do you have?";
        }
        
        if (lowerMessage.includes('science') || lowerMessage.includes('scientific')) {
          return "Science is fascinating! I can help explain scientific concepts, discuss various fields of science, and answer questions about scientific discoveries and theories. What area of science interests you?";
        }
        
        if (lowerMessage.includes('history') || lowerMessage.includes('historical')) {
          return "History is full of interesting stories and lessons! I can help you learn about historical events, figures, periods, and their significance. What historical topic would you like to explore?";
        }
        
        if (lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
          return "Technology is constantly evolving! I can help you understand current tech trends, explain technical concepts, discuss emerging technologies, and answer questions about various tech topics. What aspect of technology interests you?";
        }
        
        return mockResponses.default;
      }

      // Real API call
      const response = await fetch(API_CONFIG.OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: API_CONFIG.MODEL,
          messages: [
            { role: 'system', content: API_CONFIG.SYSTEM_PROMPT },
            ...conversationHistory.map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.message
            })),
            { role: 'user', content: message }
          ],
          max_tokens: API_CONFIG.MAX_TOKENS,
          temperature: API_CONFIG.TEMPERATURE,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Google AI API (Gemini Pro)
  async sendMessageGoogle(message, conversationHistory = []) {
    try {
      console.log('Making Google API request to:', API_CONFIG.GOOGLE_API_URL);
      
      const response = await fetch(API_CONFIG.GOOGLE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: message
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
          }
        }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Google API');
      }
    } catch (error) {
      console.error('Google API Error:', error);
      throw error;
    }
  },

  // Alternative: Use Anthropic Claude API
  async sendMessageClaude(message, conversationHistory = []) {
    try {
      const response = await fetch(API_CONFIG.ANTHROPIC_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_CONFIG.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: API_CONFIG.MAX_TOKENS,
          messages: [
            { role: 'user', content: message }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};

export default apiService;
