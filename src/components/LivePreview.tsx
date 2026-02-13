'use client';

import { useMemo, useRef, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Eye, RefreshCw, ExternalLink, Smartphone, Monitor, Tablet, Code } from 'lucide-react';

export function LivePreview() {
  const { fileContents, files } = useAppStore();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSource, setShowSource] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date(0));
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const previewData = useMemo(() => {
    // Check for HTML file
    const htmlContent = fileContents['index.html'] || fileContents['src/index.html'];
    
    if (htmlContent) {
      // Inject live reload script
      const liveReloadScript = `
        <script>
          // Auto-reload on save
          window.addEventListener('message', (e) => {
            if (e.data === 'reload') {
              location.reload();
            }
          });
        </script>
      `;
      
      // Inject CSS if exists
      let finalHTML = htmlContent;
      
      const cssContent = fileContents['style.css'] || fileContents['src/style.css'];
      if (cssContent && !finalHTML.includes('<style>')) {
        finalHTML = finalHTML.replace('</head>', `<style>${cssContent}</style></head>`);
      }
      
      // Inject JS if exists
      const jsContent = fileContents['script.js'] || fileContents['src/script.js'] || fileContents['src/index.js'];
      if (jsContent && !finalHTML.includes('<script>')) {
        finalHTML = finalHTML.replace('</body>', `<script>${jsContent}</script></body>`);
      }
      
      // Add live reload script
      if (!finalHTML.includes('window.addEventListener(')) {
        finalHTML = finalHTML.replace('</body>', `${liveReloadScript}</body>`);
      }
      
      return { html: finalHTML };
    }

    // Generate preview from JS/TS files
    const jsContent = fileContents['src/index.js'] || fileContents['index.js'];
    
    if (jsContent) {
      const generatedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, sans-serif; }
    .preview-container { padding: 20px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    // Console capture
    const logs = [];
    const originalConsole = { ...console };
    ['log', 'error', 'warn', 'info'].forEach(method => {
      console[method] = (...args) => {
        logs.push({ type: method, args: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)) });
        originalConsole[method](...args);
      };
    });

    try {
      ${jsContent}
    } catch (error) {
      document.getElementById('root').innerHTML = '<div style="color: red; padding: 20px;">Error: ' + error.message + '</div>';
    }
  </script>
</body>
</html>`;
      return { html: generatedHTML };
    }

    // Default preview
    return {
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
    <div class="text-6xl mb-4">🚀</div>
    <h1 class="text-2xl font-bold text-gray-800 mb-2">Live Preview</h1>
    <p class="text-gray-600 mb-4">Create an HTML or JavaScript file to see the preview here.</p>
    <div class="text-sm text-gray-500">
      Supported files: index.html, script.js, style.css
    </div>
  </div>
</body>
</html>
    `,
    };
  }, [fileContents]);

  const handleRefresh = () => {
    setLastRefreshedAt(new Date());
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage('reload', '*');
    }
  };

  const openInNewTab = () => {
    const blob = new Blob([previewData.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Preview Header */}
      <div className="h-10 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium">Live Preview</span>
          <span className="text-xs text-gray-500">
            Last: {lastRefreshedAt.getTime() === 0 ? '—' : lastRefreshedAt.toLocaleTimeString()}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Device Mode Toggle */}
          <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5 mr-2">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1.5 rounded ${deviceMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              title="Desktop"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('tablet')}
              className={`p-1.5 rounded ${deviceMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              title="Tablet"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1.5 rounded ${deviceMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              title="Mobile"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-1.5 rounded ${autoRefresh ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              title={autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? 'animate-spin' : ''}`} />
          </button>

            <button
              onClick={() => setShowSource(!showSource)}
              className={`p-1.5 rounded ${showSource ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              title="View source"
            >
            <Code className="w-3.5 h-3.5" />
          </button>

            <button
              onClick={openInNewTab}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Open in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Refresh preview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden bg-gray-200 dark:bg-gray-800 p-4">
        <div
          className="h-full mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden transition-all duration-300"
          style={{ maxWidth: deviceWidths[deviceMode] }}
        >
          {showSource ? (
            <pre className="h-full overflow-auto p-4 text-xs font-mono bg-gray-900 text-gray-100">
              {previewData.html}
            </pre>
          ) : (
            <iframe
              ref={iframeRef}
              srcDoc={previewData.html}
              className="w-full h-full border-0"
              title="Live Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}
