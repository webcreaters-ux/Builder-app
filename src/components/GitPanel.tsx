'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { GitBranch, CheckCircle, AlertCircle, UploadCloud, FileText } from 'lucide-react';

export function GitPanel() {
  const { gitStatus, setGitStatus } = useAppStore();
  const [commitMessage, setCommitMessage] = useState('');
  const [isPushing, setIsPushing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleStageAll = () => {
    setGitStatus({ modified: [], staged: [...gitStatus.staged, ...gitStatus.modified] });
    setStatusMessage('Staged all changes');
  };

  const handleCommit = () => {
    if (!commitMessage.trim()) return;
    setGitStatus({ modified: [], staged: [] });
    setStatusMessage(`Committed: ${commitMessage}`);
    setCommitMessage('');
  };

  const handlePush = () => {
    setIsPushing(true);
    setTimeout(() => {
      setStatusMessage('Pushed to origin/main');
      setIsPushing(false);
    }, 600);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <GitBranch className="w-4 h-4 text-blue-500" />
        <h2 className="font-semibold text-sm">Git</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Branch: main</span>
          <span>{gitStatus.modified.length + gitStatus.staged.length} changes</span>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500">Staged</div>
          {gitStatus.staged.length === 0 ? (
            <div className="text-xs text-gray-400">No staged files</div>
          ) : (
            gitStatus.staged.map((file) => (
              <div key={file} className="flex items-center gap-2 text-xs">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="truncate">{file}</span>
              </div>
            ))
          )}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold text-gray-500">Modified</div>
          {gitStatus.modified.length === 0 ? (
            <div className="text-xs text-gray-400">Working tree clean</div>
          ) : (
            gitStatus.modified.map((file) => (
              <div key={file} className="flex items-center gap-2 text-xs">
                <AlertCircle className="w-3 h-3 text-orange-500" />
                <span className="truncate">{file}</span>
              </div>
            ))
          )}
        </div>

        <button
          onClick={handleStageAll}
          className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Stage All
        </button>

        <div className="space-y-2">
          <input
            value={commitMessage}
            onChange={(e) => setCommitMessage(e.target.value)}
            placeholder="Commit message"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <button
            onClick={handleCommit}
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
          >
            Commit
          </button>
          <button
            onClick={handlePush}
            disabled={isPushing}
            className="w-full px-3 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 text-sm flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-4 h-4" />
            {isPushing ? 'Pushing...' : 'Push'}
          </button>
        </div>

        {statusMessage && (
          <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-2">
            <FileText className="w-3 h-3" /> {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}
