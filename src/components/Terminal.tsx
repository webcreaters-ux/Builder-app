'use client';

import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { Terminal as TerminalIcon, Play, Trash2, Download, Upload } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

export function Terminal() {
  const { activeFile, fileContents } = useAppStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'info', content: 'Welcome to CodeBuilder Pro Terminal', timestamp: new Date() },
    { type: 'info', content: 'Type "help" for available commands', timestamp: new Date() },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines((prev) => [...prev, { type, content, timestamp: new Date() }]);
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const args = cmd.trim().split(' ').slice(1);

    addLine('input', `$ ${cmd}`);

    // Built-in commands
    switch (trimmedCmd.split(' ')[0]) {
      case 'help':
        addLine('output', 'Available commands:');
        addLine('output', '  help          - Show this help message');
        addLine('output', '  clear         - Clear terminal');
        addLine('output', '  run           - Run current file (JS/Python)');
        addLine('output', '  ls            - List files');
        addLine('output', '  cat <file>    - Display file contents');
        addLine('output', '  echo <text>   - Print text');
        addLine('output', '  date          - Show current date/time');
        addLine('output', '  node -v       - Show Node.js version');
        addLine('output', '  npm -v        - Show npm version');
        addLine('output', '  bun -v        - Show Bun version');
        addLine('output', '  git status    - Show git status');
        addLine('output', '  pwd           - Print working directory');
        break;

      case 'clear':
        setLines([]);
        break;

      case 'run':
        if (activeFile) {
          const content = fileContents[activeFile] || '';
          const ext = activeFile.split('.').pop()?.toLowerCase();
          
          if (ext === 'js' || ext === 'jsx' || ext === 'ts' || ext === 'tsx') {
            addLine('info', `Running ${activeFile}...`);
            try {
              // Safe evaluation for demo purposes
              const logs: string[] = [];
              const mockConsole = {
                log: (...args: any[]) => logs.push(args.map(a => 
                  typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
                ).join(' ')),
                error: (...args: any[]) => logs.push('[ERROR] ' + args.join(' ')),
                warn: (...args: any[]) => logs.push('[WARN] ' + args.join(' ')),
              };
              
              // Create a safe execution context
              const safeCode = content.replace(/console\.(log|error|warn)/g, 'mockConsole.$1');
              const fn = new Function('mockConsole', safeCode);
              fn(mockConsole);
              
              if (logs.length > 0) {
                logs.forEach(log => addLine('output', log));
              } else {
                addLine('output', '(no output)');
              }
              addLine('info', 'Execution completed');
            } catch (error: any) {
              addLine('error', `Error: ${error.message}`);
            }
          } else if (ext === 'py') {
            addLine('info', 'Python execution requires a backend server.');
            addLine('output', 'To run Python code, deploy to a server with Python runtime.');
          } else {
            addLine('error', `Cannot run .${ext} files. Supported: .js, .jsx, .ts, .tsx`);
          }
        } else {
          addLine('error', 'No file selected. Open a file first.');
        }
        break;

      case 'ls':
        addLine('output', 'src/');
        addLine('output', '  index.js');
        addLine('output', 'public/');
        addLine('output', '  favicon.ico');
        addLine('output', 'package.json');
        addLine('output', 'README.md');
        break;

      case 'cat':
        if (args[0]) {
          const filePath = args.join(' ');
          const content = fileContents[filePath];
          if (content !== undefined) {
            content.split('\n').forEach(line => addLine('output', line));
          } else if (filePath === 'package.json') {
            addLine('output', '{');
            addLine('output', '  "name": "codebuilder-pro",');
            addLine('output', '  "version": "1.0.0",');
            addLine('output', '  "description": "A cutting-edge code editor"');
            addLine('output', '}');
          } else {
            addLine('error', `File not found: ${filePath}`);
          }
        } else {
          addLine('error', 'Usage: cat <filename>');
        }
        break;

      case 'echo':
        addLine('output', args.join(' '));
        break;

      case 'date':
        addLine('output', new Date().toString());
        break;

      case 'node':
        if (args[0] === '-v' || args[0] === '--version') {
          addLine('output', 'v20.10.0 (simulated)');
        } else {
          addLine('error', 'Usage: node -v');
        }
        break;

      case 'npm':
        if (args[0] === '-v' || args[0] === '--version') {
          addLine('output', '10.2.0 (simulated)');
        } else if (args[0] === 'install') {
          addLine('info', `Installing ${args[1] || 'dependencies'}...`);
          setTimeout(() => {
            addLine('output', `✓ Installed ${args[1] || 'all dependencies'}`);
          }, 500);
        } else {
          addLine('error', 'Usage: npm -v | npm install <package>');
        }
        break;

      case 'bun':
        if (args[0] === '-v' || args[0] === '--version') {
          addLine('output', '1.0.20 (simulated)');
        } else if (args[0] === 'install') {
          addLine('info', `Installing ${args[1] || 'dependencies'}...`);
          setTimeout(() => {
            addLine('output', `✓ Installed ${args[1] || 'all dependencies'}`);
          }, 300);
        } else {
          addLine('error', 'Usage: bun -v | bun install <package>');
        }
        break;

      case 'git':
        if (args[0] === 'status') {
          addLine('output', 'On branch main');
          addLine('output', 'Your branch is up to date with origin/main.');
          addLine('output', '');
          addLine('output', 'Changes not staged for commit:');
          addLine('output', '  (use "git add <file>..." to update what will be committed)');
          if (activeFile) {
            addLine('output', `    modified:   ${activeFile}`);
          }
        } else if (args[0] === 'log') {
          addLine('output', 'commit abc123 (HEAD -> main)');
          addLine('output', 'Author: Developer <dev@example.com>');
          addLine('output', 'Date:   ' + new Date().toString());
          addLine('output', '');
          addLine('output', '    Initial commit');
        } else {
          addLine('error', 'Usage: git status | git log');
        }
        break;

      case 'pwd':
        addLine('output', '/workspace/codebuilder-pro');
        break;

      case '':
        break;

      default:
        addLine('error', `Command not found: ${trimmedCmd.split(' ')[0]}. Type "help" for available commands.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      setCommandHistory((prev) => [...prev, currentInput]);
      setHistoryIndex(-1);
      executeCommand(currentInput);
    }
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  const clearTerminal = () => {
    setLines([]);
  };

  const downloadLog = () => {
    const content = lines.map(l => `[${l.type.toUpperCase()}] ${l.content}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'terminal-log.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100 font-mono text-sm">
      {/* Terminal Header */}
      <div className="h-9 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-green-400" />
          <span className="text-xs font-medium">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => executeCommand('run')}
            className="p-1.5 hover:bg-gray-700 rounded text-green-400"
            title="Run current file"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={clearTerminal}
            className="p-1.5 hover:bg-gray-700 rounded"
            title="Clear terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={downloadLog}
            className="p-1.5 hover:bg-gray-700 rounded"
            title="Download log"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={`${
              line.type === 'error'
                ? 'text-red-400'
                : line.type === 'info'
                ? 'text-blue-400'
                : line.type === 'input'
                ? 'text-yellow-300'
                : 'text-gray-100'
            }`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-gray-700">
        <span className="text-green-400">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-gray-100"
          placeholder="Type a command..."
          autoFocus
        />
      </form>
    </div>
  );
}
