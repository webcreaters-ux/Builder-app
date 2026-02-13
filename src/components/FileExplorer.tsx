'use client';

import { useState } from 'react';
import { FileNode, useAppStore } from '@/lib/store';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, Trash2 } from 'lucide-react';

export function FileExplorer() {
  const { files, activeFile, openFile, addFile, deleteFile } = useAppStore();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleAddFile = (parentPath: string, type: 'file' | 'folder') => {
    const name = prompt(`Enter ${type} name:`);
    if (name) {
      addFile(parentPath, name, type);
    }
  };

  const handleDelete = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this?')) {
      deleteFile(path);
    }
  };

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isActive = activeFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
            isActive ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              openFile(node.path);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              )}
              {isExpanded ? (
                <FolderOpen className="w-4 h-4 flex-shrink-0 text-yellow-500" />
              ) : (
                <Folder className="w-4 h-4 flex-shrink-0 text-yellow-500" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <File className="w-4 h-4 flex-shrink-0 text-gray-500" />
            </>
          )}
          <span className="flex-1 text-sm truncate">{node.name}</span>
          {node.type === 'folder' && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFile(node.path, 'file');
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Add file"
              >
                <Plus className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddFile(node.path, 'folder');
                }}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                title="Add folder"
              >
                <Folder className="w-3 h-3" />
              </button>
            </div>
          )}
          <button
            onClick={(e) => handleDelete(node.path, e)}
            className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded opacity-0 group-hover:opacity-100"
            title="Delete"
          >
            <Trash2 className="w-3 h-3 text-red-500" />
          </button>
        </div>
        {node.type === 'folder' && isExpanded && node.children && (
          <div>{node.children.map((child) => renderFileNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 className="font-semibold text-sm">Files</h2>
        <div className="flex gap-1">
          <button
            onClick={() => handleAddFile('', 'file')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            title="New file"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleAddFile('', 'folder')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            title="New folder"
          >
            <Folder className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="group">{files.map((file) => renderFileNode(file))}</div>
    </div>
  );
}
