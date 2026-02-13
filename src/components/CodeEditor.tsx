'use client';

import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { useAppStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import type * as Monaco from 'monaco-editor';

export function CodeEditor() {
  const { activeFile, fileContents, updateFileContent } = useAppStore();
  const { theme } = useTheme();
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);

  const currentContent = activeFile ? fileContents[activeFile] || '' : '';

  const getLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      html: 'html',
      css: 'css',
      json: 'json',
      md: 'markdown',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      go: 'go',
      rs: 'rust',
      php: 'php',
      rb: 'ruby',
      swift: 'swift',
      kt: 'kotlin',
      sql: 'sql',
      sh: 'shell',
      yml: 'yaml',
      yaml: 'yaml',
      xml: 'xml',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const handleEditorDidMount = (editor: Monaco.editor.IStandaloneCodeEditor, monaco: typeof Monaco) => {
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
      () => {
        // Save functionality (could trigger auto-save or show save indicator)
        console.log('Save triggered');
      }
    );
  };

  const handleEditorChange = (value: string | undefined) => {
    if (activeFile && value !== undefined) {
      updateFileContent(activeFile, value);
    }
  };

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-500">
        <div className="text-center">
          <p className="text-lg mb-2">No file selected</p>
          <p className="text-sm">Select a file from the explorer to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
        <span className="text-sm font-medium truncate">{activeFile}</span>
      </div>
      <div className="h-[calc(100%-2.5rem)]">
        <Editor
          height="100%"
          language={getLanguage(activeFile)}
          value={currentContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: typeof window !== 'undefined' && window.innerWidth > 768 },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            matchBrackets: 'always',
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}
