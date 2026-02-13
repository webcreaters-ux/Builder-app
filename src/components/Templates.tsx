'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { 
  X, 
  FileCode, 
  Globe, 
  Server, 
  Database, 
  Smartphone,
  Palette,
  Terminal,
  Package
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  files: { path: string; content: string }[];
}

interface TemplatesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Templates({ isOpen, onClose }: TemplatesProps) {
  const { setFiles, setFileContents, setActiveFile, setOpenFiles, addRecentTemplate } = useAppStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: 'blank',
      name: 'Blank Project',
      description: 'Start from scratch with an empty project',
      icon: <FileCode className="w-8 h-8" />,
      files: [
        { path: 'src/index.js', content: '// Start coding here!\nconsole.log("Hello World");' }
      ]
    },
    {
      id: 'html-css-js',
      name: 'HTML/CSS/JS',
      description: 'Classic web project with HTML, CSS, and JavaScript',
      icon: <Globe className="w-8 h-8" />,
      files: [
        { 
          path: 'index.html', 
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Welcome to My Website</h1>
    <p>Start building something amazing!</p>
    <button id="clickMe">Click Me</button>
  </div>
  <script src="script.js"></script>
</body>
</html>` 
        },
        { 
          path: 'style.css', 
          content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}` 
        },
        { 
          path: 'script.js', 
          content: `// JavaScript functionality
document.getElementById('clickMe').addEventListener('click', () => {
  alert('Hello from CodeBuilder Pro! 🚀');
});

console.log('Website loaded!');` 
        }
      ]
    },
    {
      id: 'react',
      name: 'React App',
      description: 'Modern React application with hooks',
      icon: <Palette className="w-8 h-8 text-cyan-500" />,
      files: [
        { 
          path: 'src/App.jsx', 
          content: `import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem',
        borderRadius: '1rem',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{ marginBottom: '1rem', color: '#333' }}>
          React Counter App
        </h1>
        <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>{count}</p>
        <button 
          onClick={() => setCount(c => c + 1)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>
    </div>
  );
}

export default App;` 
        },
        { 
          path: 'src/index.js', 
          content: `// React App Entry Point
// In a real project, this would use ReactDOM.createRoot
console.log('React App loaded!');

// Simulated React render
const App = () => {
  let count = 0;
  const increment = () => {
    count++;
    console.log('Count:', count);
  };
};

// For preview purposes
document.body.innerHTML = \`
  <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-family: system-ui, sans-serif;">
    <div style="background: white; padding: 3rem; border-radius: 1rem; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
      <h1 style="margin-bottom: 1rem; color: #333;">React Counter App</h1>
      <p id="count" style="font-size: 3rem; margin-bottom: 1rem;">0</p>
      <button id="increment" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; font-size: 1rem; cursor: pointer;">Increment</button>
    </div>
  </div>
\`;

let count = 0;
document.getElementById('increment').addEventListener('click', () => {
  count++;
  document.getElementById('count').textContent = count;
});` 
        }
      ]
    },
    {
      id: 'node-api',
      name: 'Node.js API',
      description: 'RESTful API with Express.js',
      icon: <Server className="w-8 h-8 text-green-500" />,
      files: [
        { 
          path: 'src/server.js', 
          content: `// Express.js REST API
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: Date.now(), name });
});

// Start server (simulated)
console.log(\`Server running at http://localhost:\${PORT}\`);
console.log('Available endpoints:');
console.log('  GET  /');
console.log('  GET  /api/users');
console.log('  POST /api/users');` 
        },
        { 
          path: 'package.json', 
          content: `{
  "name": "my-api",
  "version": "1.0.0",
  "description": "RESTful API with Express",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}` 
        }
      ]
    },
    {
      id: 'python',
      name: 'Python Script',
      description: 'Python application with common utilities',
      icon: <Terminal className="w-8 h-8 text-yellow-500" />,
      files: [
        { 
          path: 'main.py', 
          content: `#!/usr/bin/env python3
"""
Python Starter Template
A modern Python application template
"""

import json
from datetime import datetime
from typing import List, Dict, Optional

class DataProcessor:
    """Process and transform data"""
    
    def __init__(self, name: str):
        self.name = name
        self.created_at = datetime.now()
    
    def process(self, data: List[Dict]) -> List[Dict]:
        """Process a list of dictionaries"""
        return [
            {**item, 'processed': True, 'processor': self.name}
            for item in data
        ]
    
    def to_json(self, data: any) -> str:
        """Convert data to JSON string"""
        return json.dumps(data, indent=2, default=str)

def main():
    """Main entry point"""
    print("🐍 Python Application Started")
    print(f"⏰ Time: {datetime.now().isoformat()}")
    
    # Sample data
    sample_data = [
        {"id": 1, "name": "Alice"},
        {"id": 2, "name": "Bob"},
        {"id": 3, "name": "Charlie"}
    ]
    
    # Process data
    processor = DataProcessor("MyProcessor")
    processed = processor.process(sample_data)
    
    print("\\n📊 Processed Data:")
    print(processor.to_json(processed))

if __name__ == "__main__":
    main()` 
        },
        { 
          path: 'requirements.txt', 
          content: `# Python dependencies
# Add your project dependencies here

# requests>=2.31.0
# python-dotenv>=1.0.0` 
        }
      ]
    },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      description: 'Beautiful UI with Tailwind CSS',
      icon: <Palette className="w-8 h-8 text-cyan-400" />,
      files: [
        { 
          path: 'index.html', 
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind CSS App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-purple-500 to-pink-500 min-h-screen">
  <div class="container mx-auto px-4 py-16">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Tailwind! 🎨
        </h1>
        <p class="text-gray-600 mb-8">
          Build beautiful, responsive designs with utility-first CSS.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-purple-100 p-4 rounded-lg text-center">
            <div class="text-3xl mb-2">🚀</div>
            <h3 class="font-semibold text-purple-800">Fast</h3>
          </div>
          <div class="bg-pink-100 p-4 rounded-lg text-center">
            <div class="text-3xl mb-2">📱</div>
            <h3 class="font-semibold text-pink-800">Responsive</h3>
          </div>
          <div class="bg-blue-100 p-4 rounded-lg text-center">
            <div class="text-3xl mb-2">🎨</div>
            <h3 class="font-semibold text-blue-800">Beautiful</h3>
          </div>
        </div>
        
        <button class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Get Started
        </button>
      </div>
    </div>
  </div>
</body>
</html>` 
        }
      ]
    }
  ];

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template.id);
  };

  const handleApplyTemplate = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return;

    // Build file tree from template
    const fileTree: any[] = [];
    const fileContents: Record<string, string> = {};

    // Group files by directory
    const dirs: Record<string, any[]> = {};
    
    template.files.forEach(file => {
      const parts = file.path.split('/');
      if (parts.length > 1) {
        const dirName = parts[0];
        if (!dirs[dirName]) dirs[dirName] = [];
        dirs[dirName].push({
          name: parts[parts.length - 1],
          path: file.path,
          type: 'file',
          content: file.content
        });
      } else {
        fileTree.push({
          name: parts[0],
          path: file.path,
          type: 'file',
          content: file.content
        });
      }
      fileContents[file.path] = file.content;
    });

    // Add directories to tree
    Object.entries(dirs).forEach(([dirName, files]) => {
      fileTree.push({
        name: dirName,
        path: dirName,
        type: 'folder',
        children: files
      });
    });

    setFiles(fileTree);
    setFileContents(fileContents);
    setOpenFiles(template.files.map((file) => file.path));
    setActiveFile(template.files[0].path);
    addRecentTemplate(template.id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold">Choose a Template</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {template.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {template.files.length} file{template.files.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedTemplate 
              ? `Selected: ${templates.find(t => t.id === selectedTemplate)?.name}`
              : 'Select a template to get started'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
