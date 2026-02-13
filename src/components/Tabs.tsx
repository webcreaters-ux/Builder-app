'use client';

import { useAppStore } from '@/lib/store';
import { X, File, Circle } from 'lucide-react';

export function Tabs() {
  const { 
    activeFile, 
    setActiveFile, 
    fileContents,
    openFiles,
    closeFile
  } = useAppStore();

  const visibleFiles = openFiles.length > 0 ? openFiles : Object.keys(fileContents);

  const getFileName = (path: string) => path.split('/').pop() || path;
  
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const icons: Record<string, string> = {
      js: '🟨',
      jsx: '⚛️',
      ts: '🔷',
      tsx: '⚛️',
      html: '🌐',
      css: '🎨',
      json: '📋',
      md: '📝',
      py: '🐍',
      go: '🐹',
      rs: '🦀',
    };
    return icons[ext || ''] || '📄';
  };

  const isModified = (path: string) => {
    // In a real implementation, we'd track original vs current content
    return false;
  };

  if (visibleFiles.length === 0) {
    return null;
  }

  return (
    <div className="h-9 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center overflow-x-auto flex-shrink-0">
      {visibleFiles.map((path) => {
        const fileName = getFileName(path);
        const isActive = activeFile === path;
        const modified = isModified(path);

        return (
          <div
            key={path}
            className={`group flex items-center gap-2 px-3 h-full border-r border-gray-200 dark:border-gray-700 cursor-pointer min-w-0 ${
              isActive
                ? 'bg-white dark:bg-gray-900 border-b-2 border-b-blue-500'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
            onClick={() => setActiveFile(path)}
          >
            <span className="text-sm">{getFileIcon(fileName)}</span>
            <span className="text-sm truncate max-w-[120px]">{fileName}</span>
            {modified ? (
              <Circle className="w-3 h-3 fill-orange-400 text-orange-400" />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeFile(path);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
