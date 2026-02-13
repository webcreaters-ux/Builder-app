export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function callOpenRouter(
  apiKey: string,
  messages: Message[],
  model: string = 'qwen/qwen3-coder:free'
): Promise<string> {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CodeBuilder Pro',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    console.error('OpenRouter error:', error);
    throw error;
  }
}

export async function getAICodeSuggestion(
  apiKey: string,
  code: string,
  prompt: string,
  language: string = 'javascript'
): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are an expert ${language} developer. Help improve and write code based on user requests. Return only the code without explanations unless asked.`,
    },
    {
      role: 'user',
      content: `Current code:\n\`\`\`${language}\n${code}\n\`\`\`\n\nRequest: ${prompt}`,
    },
  ];

  return callOpenRouter(apiKey, messages);
}

export async function explainCode(
  apiKey: string,
  code: string,
  language: string = 'javascript'
): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: 'You are a helpful coding tutor. Explain code clearly and concisely.',
    },
    {
      role: 'user',
      content: `Explain this ${language} code:\n\`\`\`${language}\n${code}\n\`\`\``,
    },
  ];

  return callOpenRouter(apiKey, messages);
}

export async function fixCode(
  apiKey: string,
  code: string,
  error: string,
  language: string = 'javascript'
): Promise<string> {
  const messages: Message[] = [
    {
      role: 'system',
      content: `You are an expert debugger. Fix code errors and return the corrected code.`,
    },
    {
      role: 'user',
      content: `Fix this ${language} code that has an error:\n\nCode:\n\`\`\`${language}\n${code}\n\`\`\`\n\nError: ${error}`,
    },
  ];

  return callOpenRouter(apiKey, messages);
}
