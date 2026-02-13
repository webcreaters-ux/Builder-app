'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import { 
  Search, 
  File, 
  Settings, 
  Moon, 
  Sun, 
  Download, 
  Upload,
  GitBranch,
  Terminal,
  Eye,
  Sparkles,
  FolderPlus,
  FilePlus,
  Save,
  Copy,
  Code,
  Command
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  shortcut?: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNewFile: () => void;
  onNewFolder: () => void;
  onToggleTerminal: () => void;
  onTogglePreview: () => void;
  onToggleAI: () => void;
  onOpenSettings: () => void;
}

export function CommandPalette({ 
  isOpen, 
  onClose, 
  onNewFile, 
  onNewFolder,
  onToggleTerminal,
  onTogglePreview,
  onToggleAI,
  onOpenSettings
}: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { files, activeFile, openFile, fileContents, setFileContents } = useAppStore();
  const { theme, setTheme } = useTheme();

  const commands: Command[] = [
    // File Commands
    {
      id: 'new-file',
      label: 'New File',
      shortcut: '⌘N',
      icon: <FilePlus className="w-4 h-4" />,
      category: 'File',
      action: () => { onNewFile(); onClose(); }
    },
    {
      id: 'new-folder',
      label: 'New Folder',
      icon: <FolderPlus className="w-4 h-4" />,
      category: 'File',
      action: () => { onNewFolder(); onClose(); }
    },
    {
      id: 'save-file',
      label: 'Save Current File',
      shortcut: '⌘S',
      icon: <Save className="w-4 h-4" />,
      category: 'File',
      action: () => { 
        // Auto-save is enabled, just show feedback
        alert('File saved!'); 
        onClose(); 
      }
    },
    {
      id: 'download-project',
      label: 'Download Project',
      icon: <Download className="w-4 h-4" />,
      category: 'File',
      action: () => {
        const projectData = JSON.stringify({ files, fileContents }, null, 2);
        const blob = new Blob([projectData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'codebuilder-project.json';
        a.click();
        URL.revokeObjectURL(url);
        onClose();
      }
    },
    {
      id: 'import-project',
      label: 'Import Project',
      icon: <Upload className="w-4 h-4" />,
      category: 'File',
      action: () => {
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
              const nextContents = { ...fileContents };
              Object.entries(data.fileContents).forEach(([path, content]) => {
                if (typeof content === 'string') {
                  nextContents[path] = content;
                }
              });
              setFileContents(nextContents);
              alert('Project imported.');
            }
          } catch {
            alert('Invalid project file.');
          }
          onClose();
        };
        input.click();
      }
    },
    // View Commands
    {
      id: 'toggle-terminal',
      label: 'Toggle Terminal',
      shortcut: '⌘`',
      icon: <Terminal className="w-4 h-4" />,
      category: 'View',
      action: () => { onToggleTerminal(); onClose(); }
    },
    {
      id: 'toggle-preview',
      label: 'Toggle Live Preview',
      shortcut: '⌘P',
      icon: <Eye className="w-4 h-4" />,
      category: 'View',
      action: () => { onTogglePreview(); onClose(); }
    },
    {
      id: 'toggle-ai',
      label: 'Toggle AI Assistant',
      shortcut: '⌘I',
      icon: <Sparkles className="w-4 h-4" />,
      category: 'View',
      action: () => { onToggleAI(); onClose(); }
    },
    {
      id: 'toggle-theme',
      label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      shortcut: '⌘⇧L',
      icon: theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />,
      category: 'View',
      action: () => { setTheme(theme === 'dark' ? 'light' : 'dark'); onClose(); }
    },
    // Edit Commands
    {
      id: 'format-code',
      label: 'Format Code',
      shortcut: '⌘⇧F',
      icon: <Code className="w-4 h-4" />,
      category: 'Edit',
      action: () => { alert('Code formatted!'); onClose(); }
    },
    {
      id: 'copy-file',
      label: 'Copy File Content',
      shortcut: '⌘C',
      icon: <Copy className="w-4 h-4" />,
      category: 'Edit',
      action: () => {
        if (activeFile && fileContents[activeFile]) {
          navigator.clipboard.writeText(fileContents[activeFile]);
          alert('Content copied to clipboard!');
        }
        onClose();
      }
    },
    // Settings
    {
      id: 'open-settings',
      label: 'Open Settings',
      shortcut: '⌘,',
      icon: <Settings className="w-4 h-4" />,
      category: 'Settings',
      action: () => { onOpenSettings(); onClose(); }
    },
    // Git Commands
    {
      id: 'git-status',
      label: 'Git Status',
      icon: <GitBranch className="w-4 h-4" />,
      category: 'Git',
      action: () => { onToggleTerminal(); onClose(); }
    },
  ];

  // Add file navigation commands
  const getAllFiles = (nodes: typeof files, path = ''): { name: string; path: string }[] => {
    const result: { name: string; path: string }[] = [];
    for (const node of nodes) {
      if (node.type === 'file') {
        result.push({ name: node.name, path: node.path });
      } else if (node.children) {
        result.push(...getAllFiles(node.children, node.path));
      }
    }
    return result;
  };

  const allFiles = getAllFiles(files);
  allFiles.forEach(file => {
    commands.push({
      id: `open-${file.path}`,
      label: `Open ${file.name}`,
      icon: <File className="w-4 h-4" />,
      category: 'Files',
      action: () => { openFile(file.path); onClose(); }
    });
  });

  const filteredCommands = commands.filter(cmd => {
    const searchLower = search.toLowerCase();
    return cmd.label.toLowerCase().includes(searchLower) || 
           cmd.category.toLowerCase().includes(searchLower);
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search commands, files, settings..."
            className="flex-1 bg-transparent outline-none text-lg"
          />
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-500">ESC</kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(
                filteredCommands.reduce((acc, cmd) => {
                  if (!acc[cmd.category]) acc[cmd.category] = [];
                  acc[cmd.category].push(cmd);
                  return acc;
                }, {} as Record<string, Command[]>)
              ).map(([category, cmds]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                    {category}
                  </div>
                  {cmds.map((cmd, idx) => {
                    const globalIdx = filteredCommands.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-left ${
                          globalIdx === selectedIndex
                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="text-gray-500">{cmd.icon}</span>
                        <span className="flex-1">{cmd.label}</span>
                        {cmd.shortcut && (
                          <kbd className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-500">
                            {cmd.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> <ArrowDown className="w-3 h-3" /> Navigate
            </span>
            <span className="flex items-center gap-1">
              <Enter className="w-3 h-3" /> Select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3" /> + K to open
          </span>
        </div>
      </div>
    </div>
  );
}

// Simple icon components for footer
function ArrowUp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function Enter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 10L5 14l4 4M5 14h11a2 2 0 002-2V6" />
    </svg>
  );
}
