'use client';

import { useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Search, Replace, X, FileText, ArrowRightLeft } from 'lucide-react';

interface SearchResult {
  path: string;
  matches: { line: number; preview: string }[];
}

export function SearchReplace() {
  const { fileContents, setSearchQuery, setReplaceQuery, searchQuery, replaceQuery, updateFileContent } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [] as SearchResult[];
    const query = matchCase ? searchQuery : searchQuery.toLowerCase();
    const regex = useRegex ? new RegExp(searchQuery, matchCase ? 'g' : 'gi') : null;

    return Object.entries(fileContents).reduce<SearchResult[]>((acc, [path, content]) => {
      const lines = content.split('\n');
      const matches = lines
        .map((line, idx) => {
          const lineToSearch = matchCase ? line : line.toLowerCase();
          const matched = regex ? regex.test(line) : lineToSearch.includes(query);
          return matched ? { line: idx + 1, preview: line.trim().slice(0, 120) } : null;
        })
        .filter(Boolean) as { line: number; preview: string }[];

      if (matches.length > 0) acc.push({ path, matches });
      return acc;
    }, []);
  }, [fileContents, searchQuery, matchCase, useRegex]);

  const handleReplaceAll = () => {
    if (!searchQuery.trim()) return;
    const regex = useRegex
      ? new RegExp(searchQuery, matchCase ? 'g' : 'gi')
      : new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), matchCase ? 'g' : 'gi');

    Object.entries(fileContents).forEach(([path, content]) => {
      const updated = content.replace(regex, replaceQuery);
      if (updated !== content) {
        updateFileContent(path, updated);
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        title="Search & replace"
      >
        <Search className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="absolute top-16 right-4 z-40 w-[420px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">Search & Replace</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
              placeholder="Search across files..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Replace className="w-4 h-4 text-gray-400" />
            <input
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm"
              placeholder="Replace with..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={matchCase} onChange={(e) => setMatchCase(e.target.checked)} />
            Match case
          </label>
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} />
            Regex
          </label>
          <button
            onClick={handleReplaceAll}
            className="ml-auto px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600"
          >
            Replace all
          </button>
        </div>

        <div className="max-h-56 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-lg">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No matches found.</div>
          ) : (
            results.map((result) => (
              <div key={result.path} className="border-b border-gray-200 dark:border-gray-800">
                <div className="px-3 py-2 text-xs font-semibold flex items-center gap-2 bg-gray-50 dark:bg-gray-800">
                  <FileText className="w-3 h-3" /> {result.path}
                </div>
                {result.matches.map((match, idx) => (
                  <div key={idx} className="px-3 py-2 text-xs flex items-center gap-2">
                    <ArrowRightLeft className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">L{match.line}:</span>
                    <span className="truncate">{match.preview}</span>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
