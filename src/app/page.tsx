'use client';

import { useState } from 'react';
import { FileExplorer } from '@/components/FileExplorer';
import { CodeEditor } from '@/components/CodeEditor';
import { AIAssistant } from '@/components/AIAssistant';
import { Settings } from '@/components/Settings';
import { useAppStore } from '@/lib/store';
import { 
  Menu, 
  X, 
  Code2, 
  Sparkles, 
  Settings as SettingsIcon,
  Moon,
  Sun,
  Github
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Home() {
  const [activeView, setActiveView] = useState<'editor' | 'settings'>('editor');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAIAssisting, setIsAIAssisting } = useAppStore();
  const { theme, setTheme } = useTheme();

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
            <main className="flex-1 overflow-hidden">
              <CodeEditor />
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
    </div>
  );
}
