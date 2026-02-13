'use client';

import { useEffect, useState } from 'react';
import { FileExplorer } from '@/components/FileExplorer';
import { CodeEditor } from '@/components/CodeEditor';
import { AIAssistant } from '@/components/AIAssistant';
import { Settings } from '@/components/Settings';
import { Terminal } from '@/components/Terminal';
import { LivePreview } from '@/components/LivePreview';
import { StatusBar } from '@/components/StatusBar';
import { Tabs } from '@/components/Tabs';
import { Templates } from '@/components/Templates';
import { CommandPalette } from '@/components/CommandPalette';
import { SearchReplace } from '@/components/SearchReplace';
import { PackageManager } from '@/components/PackageManager';
import { GitPanel } from '@/components/GitPanel';
import { useAppStore } from '@/lib/store';
import { 
  Menu, 
  X, 
  Code2, 
  Sparkles, 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Github,
  Terminal as TerminalIcon,
  Eye,
  LayoutGrid,
  Search,
  Upload,
  Download
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Home() {
  const [activeView, setActiveView] = useState<'editor' | 'settings'>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const { isAIAssisting, setIsAIAssisting, setActiveFile, setFileContents, fileContents, addFile } = useAppStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setShowTerminal((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setShowPreview((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDownloadProject = () => {
    const payload = JSON.stringify({ fileContents }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codebuilder-project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUploadProject = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        if (data?.fileContents && typeof data.fileContents === 'object') {
          setFileContents(data.fileContents);
          const paths = Object.keys(data.fileContents);
          if (paths.length > 0) {
            setActiveFile(paths[0]);
          }
        }
      } catch {
        alert('Invalid project file.');
      }
    };
    input.click();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="h-14 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CodeBuilder Pro
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView(activeView === 'editor' ? 'settings' : 'editor')}
            className={`p-2 rounded-lg ${
              activeView === 'settings'
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsTemplatesOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Templates"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Command palette (Ctrl/Cmd + K)"
          >
            <Search className="w-5 h-5" />
          </button>

          <SearchReplace />

          <button
            onClick={() => setShowTerminal((prev) => !prev)}
            className={`p-2 rounded-lg ${showTerminal ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            title="Toggle terminal"
          >
            <TerminalIcon className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowPreview((prev) => !prev)}
            className={`p-2 rounded-lg ${showPreview ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
            title="Toggle live preview"
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            onClick={handleUploadProject}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Import project"
          >
            <Upload className="w-5 h-5" />
          </button>

          <button
            onClick={handleDownloadProject}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Export project"
          >
            <Download className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setIsAIAssisting(!isAIAssisting)}
            className={`p-2 rounded-lg lg:hidden ${
              isAIAssisting
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="AI Assistant"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {activeView === 'editor' ? (
          <>
            {/* File Explorer - Desktop always visible, Mobile toggle */}
            <aside
              className={`
                w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-800
                lg:block
                ${isSidebarOpen ? 'block absolute inset-y-14 left-0 z-20 bg-white dark:bg-gray-900' : 'hidden'}
              `}
            >
              <FileExplorer />
            </aside>

            {/* Code Editor */}
            <main className="flex-1 overflow-hidden flex flex-col">
              <Tabs />
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0">
                <div className="min-w-0">
                  <CodeEditor />
                </div>
                <div className="hidden lg:flex flex-col border-l border-gray-200 dark:border-gray-800">
                  {showPreview && (
                    <div className="flex-1 min-h-[280px]">
                      <LivePreview />
                    </div>
                  )}
                  <div className="h-56 border-t border-gray-200 dark:border-gray-800">
                    <PackageManager />
                  </div>
                  <div className="h-56 border-t border-gray-200 dark:border-gray-800">
                    <GitPanel />
                  </div>
                </div>
              </div>
              {showTerminal && (
                <div className="h-64 border-t border-gray-200 dark:border-gray-800">
                  <Terminal />
                </div>
              )}
            </main>

            {/* AI Assistant - Desktop always visible, Mobile toggle */}
            <aside
              className={`
                w-80 flex-shrink-0 border-l border-gray-200 dark:border-gray-800
                lg:block
                ${isAIAssisting ? 'block absolute inset-y-14 right-0 z-20 bg-white dark:bg-gray-900' : 'hidden'}
              `}
            >
              <AIAssistant />
            </aside>
          </>
        ) : (
          <main className="flex-1 overflow-hidden">
            <Settings />
          </main>
        )}
      </div>

      <StatusBar showTerminal={showTerminal} showPreview={showPreview} showAI={isAIAssisting} />

      {/* Mobile overlay */}
      {(isSidebarOpen || isAIAssisting) && (
        <div
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => {
            setIsSidebarOpen(false);
            setIsAIAssisting(false);
          }}
        />
      )}

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNewFile={() => {
          const name = prompt('New file name (e.g. src/index.js):');
          if (!name) return;
          const parts = name.split('/');
          if (parts.length > 1) {
            const parentPath = parts.slice(0, -1).join('/');
            const filename = parts[parts.length - 1];
            addFile(parentPath, filename, 'file');
          } else {
            addFile('', name, 'file');
          }
        }}
        onNewFolder={() => {
          const name = prompt('New folder name (e.g. src/components):');
          if (!name) return;
          const parts = name.split('/');
          if (parts.length > 1) {
            const parentPath = parts.slice(0, -1).join('/');
            const folderName = parts[parts.length - 1];
            addFile(parentPath, folderName, 'folder');
          } else {
            addFile('', name, 'folder');
          }
        }}
        onToggleTerminal={() => setShowTerminal((prev) => !prev)}
        onTogglePreview={() => setShowPreview((prev) => !prev)}
        onToggleAI={() => setIsAIAssisting(!isAIAssisting)}
        onOpenSettings={() => setActiveView('settings')}
      />

      <Templates isOpen={isTemplatesOpen} onClose={() => setIsTemplatesOpen(false)} />
    </div>
  );
}
