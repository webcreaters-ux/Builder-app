'use client';

import { useAppStore } from '@/lib/store';
import { GitBranch, AlertCircle, Check, Wifi, WifiOff } from 'lucide-react';

interface StatusBarProps {
  showTerminal: boolean;
  showPreview: boolean;
  showAI: boolean;
}

export function StatusBar({ showTerminal, showPreview, showAI }: StatusBarProps) {
  const { activeFile, fileContents } = useAppStore();
  
  const currentContent = activeFile ? fileContents[activeFile] || '' : '';
  const lineCount = currentContent.split('\n').length;
  const charCount = currentContent.length;
  const cursorLine = 1; // Would need to track from editor
  const cursorCol = 1; // Would need to track from editor
  
  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toUpperCase() || 'FILE';
  };

  const getLanguageIcon = (ext: string) => {
    const icons: Record<string, string> = {
      JS: '🟨',
      JSX: '⚛️',
      TS: '🔷',
      TSX: '⚛️',
      HTML: '🌐',
      CSS: '🎨',
      JSON: '📋',
      MD: '📝',
      PY: '🐍',
      GO: '🐹',
      RS: '🦀',
    };
    return icons[ext] || '📄';
  };

  return (
    <footer className="h-6 bg-blue-600 dark:bg-gray-800 text-white text-xs flex items-center justify-between px-3 flex-shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Git Branch */}
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5" />
          <span>main</span>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-green-300" />
          <span>Synced</span>
        </div>

        {/* Active Panels */}
        <div className="flex items-center gap-2">
          {showTerminal && (
            <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">TERMINAL</span>
          )}
          {showPreview && (
            <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">PREVIEW</span>
          )}
          {showAI && (
            <span className="px-1.5 py-0.5 bg-white/20 rounded text-[10px]">AI</span>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* File Info */}
        {activeFile && (
          <>
            <span className="flex items-center gap-1">
              <span>{getLanguageIcon(getFileExtension(activeFile))}</span>
              <span>{getFileExtension(activeFile)}</span>
            </span>
            <span>Ln {cursorLine}, Col {cursorCol}</span>
            <span>{lineCount} lines</span>
            <span>{charCount} chars</span>
          </>
        )}

        {/* Encoding */}
        <span>UTF-8</span>

        {/* Connection Status */}
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-green-300" />
          <span>Connected</span>
        </div>

        {/* AI Status */}
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>AI Ready</span>
        </div>
      </div>
    </footer>
  );
}
