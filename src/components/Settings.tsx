'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { deployToGitHub } from '@/lib/github';
import { Settings as SettingsIcon, Github, Key, Loader2, CheckCircle, XCircle } from 'lucide-react';

export function Settings() {
  const { 
    openRouterApiKey, 
    setOpenRouterApiKey, 
    githubToken, 
    setGithubToken,
    files,
    fileContents 
  } = useAppStore();
  
  const [localApiKey, setLocalApiKey] = useState(openRouterApiKey);
  const [localGithubToken, setLocalGithubToken] = useState(githubToken);
  const [repoName, setRepoName] = useState('my-code-project');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployStatus, setDeployStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSaveKeys = () => {
    setOpenRouterApiKey(localApiKey);
    setGithubToken(localGithubToken);
    alert('API keys saved!');
  };

  const handleDeploy = async () => {
    if (!githubToken) {
      setDeployStatus({ type: 'error', message: 'Please set your GitHub token first' });
      return;
    }

    if (!repoName.trim()) {
      setDeployStatus({ type: 'error', message: 'Please enter a repository name' });
      return;
    }

    setIsDeploying(true);
    setDeployStatus(null);

    try {
      const result = await deployToGitHub(githubToken, repoName, files, fileContents);
      setDeployStatus({ 
        type: 'success', 
        message: `${result.message} View at: ${result.url}` 
      });
    } catch (error: any) {
      setDeployStatus({ 
        type: 'error', 
        message: error.message || 'Failed to deploy to GitHub' 
      });
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* OpenRouter API Key */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold">OpenRouter API Key</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get your free API key from{' '}
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-500 hover:underline"
            >
              openrouter.ai/keys
            </a>
          </p>
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="sk-or-v1-..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* GitHub Token */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <h2 className="text-lg font-semibold">GitHub Personal Access Token</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Create a token at{' '}
            <a
              href="https://github.com/settings/tokens/new?scopes=repo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              github.com/settings/tokens
            </a>
            {' '}with <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">repo</code> scope
          </p>
          <input
            type="password"
            value={localGithubToken}
            onChange={(e) => setLocalGithubToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSaveKeys}
          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 font-medium"
        >
          Save API Keys
        </button>

        <hr className="border-gray-200 dark:border-gray-800" />

        {/* Deploy to GitHub */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Github className="w-5 h-5" />
            Deploy to GitHub
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Deploy your project to a GitHub repository
          </p>
          <input
            type="text"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="repository-name"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleDeploy}
            disabled={isDeploying || !githubToken}
            className="w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeploying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <Github className="w-5 h-5" />
                Deploy to GitHub
              </>
            )}
          </button>

          {deployStatus && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                deployStatus.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              {deployStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm ${
                  deployStatus.type === 'success'
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}
              >
                {deployStatus.message}
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100">Quick Start</h3>
          <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
            <li>Get your OpenRouter API key for AI features</li>
            <li>Create a GitHub token for deployments</li>
            <li>Save your keys above</li>
            <li>Start coding with AI assistance!</li>
            <li>Deploy to GitHub when ready</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
