'use client';

import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Package, Plus, Trash2, Loader2 } from 'lucide-react';

export function PackageManager() {
  const { packages, addPackage, removePackage } = useAppStore();
  const [name, setName] = useState('');
  const [version, setVersion] = useState('latest');
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    if (!name.trim()) return;
    setIsInstalling(true);
    setTimeout(() => {
      addPackage({ name: name.trim(), version: version.trim() || 'latest' });
      setName('');
      setVersion('latest');
      setIsInstalling(false);
    }, 500);
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <Package className="w-4 h-4 text-emerald-500" />
        <h2 className="font-semibold text-sm">Packages</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Package name (e.g. axios)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <input
            value={version}
            onChange={(e) => setVersion(e.target.value)}
            placeholder="Version (e.g. ^1.2.3)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <button
            onClick={handleInstall}
            disabled={isInstalling || !name.trim()}
            className="w-full px-3 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {isInstalling ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Install Package
          </button>
        </div>

        <div className="space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="flex items-center justify-between px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-lg"
            >
              <div>
                <div className="text-sm font-medium">{pkg.name}</div>
                <div className="text-xs text-gray-500">{pkg.version}</div>
              </div>
              <button
                onClick={() => removePackage(pkg.name)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                title="Uninstall"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
