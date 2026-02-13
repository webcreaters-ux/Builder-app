'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { getAICodeSuggestion, explainCode, fixCode } from '@/lib/openrouter';
import { Sparkles, Send, Loader2, X } from 'lucide-react';

export function AIAssistant() {
  const { activeFile, fileContents, updateFileContent, openRouterApiKey, isAIAssisting, setIsAIAssisting } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currentContent = activeFile ? fileContents[activeFile] || '' : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!openRouterApiKey) {
      setError('Please set your OpenRouter API key in settings');
      return;
    }

    if (!activeFile) {
      setError('Please select a file first');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const language = activeFile.split('.').pop() || 'javascript';
      const aiResponse = await getAICodeSuggestion(
        openRouterApiKey,
        currentContent,
        prompt,
        language
      );
      
      setResponse(aiResponse);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplain = async () => {
    if (!openRouterApiKey || !activeFile) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const language = activeFile.split('.').pop() || 'javascript';
      const aiResponse = await explainCode(openRouterApiKey, currentContent, language);
      setResponse(aiResponse);
    } catch (err: any) {
      setError(err.message || 'Failed to explain code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyCode = () => {
    if (!activeFile || !response) return;

    // Extract code from markdown code blocks if present
    const codeMatch = response.match(/```[\w]*\n([\s\S]*?)```/);
    const codeToApply = codeMatch ? codeMatch[1] : response;

    updateFileContent(activeFile, codeToApply.trim());
    setResponse('');
    setPrompt('');
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <h2 className="font-semibold text-sm">AI Assistant</h2>
        </div>
        <button
          onClick={() => setIsAIAssisting(false)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded lg:hidden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!openRouterApiKey && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm">
            <p className="text-yellow-800 dark:text-yellow-200">
              Please set your OpenRouter API key in the settings to use AI features.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <button
            onClick={handleExplain}
            disabled={!openRouterApiKey || !activeFile || isLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            Explain Current Code
          </button>
        </div>

        {response && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
            <div className="text-sm whitespace-pre-wrap">{response}</div>
            {response.includes('```') && (
              <button
                onClick={handleApplyCode}
                className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
              >
                Apply Code
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-200">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask AI to modify code..."
            disabled={isLoading || !openRouterApiKey}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !openRouterApiKey || !prompt.trim()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
