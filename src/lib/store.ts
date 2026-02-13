import { create } from 'zustand';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

interface AppState {
  files: FileNode[];
  activeFile: string | null;
  openFiles: string[];
  fileContents: Record<string, string>;
  isAIAssisting: boolean;
  isMobileMenuOpen: boolean;
  openRouterApiKey: string;
  githubToken: string;
  showTerminal: boolean;
  showPreview: boolean;
  searchQuery: string;
  replaceQuery: string;
  packages: { name: string; version: string }[];
  gitStatus: { modified: string[]; staged: string[] };
  recentTemplates: string[];
  
  setFiles: (files: FileNode[]) => void;
  setFileContents: (contents: Record<string, string>) => void;
  setActiveFile: (path: string | null) => void;
  setOpenFiles: (paths: string[]) => void;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  updateFileContent: (path: string, content: string) => void;
  setIsAIAssisting: (isAssisting: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setOpenRouterApiKey: (key: string) => void;
  setGithubToken: (token: string) => void;
  setShowTerminal: (show: boolean) => void;
  setShowPreview: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  setReplaceQuery: (query: string) => void;
  setPackages: (packages: { name: string; version: string }[]) => void;
  addPackage: (pkg: { name: string; version: string }) => void;
  removePackage: (name: string) => void;
  setGitStatus: (status: { modified: string[]; staged: string[] }) => void;
  addRecentTemplate: (templateId: string) => void;
  addFile: (parentPath: string, name: string, type: 'file' | 'folder') => void;
  deleteFile: (path: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  files: [
    {
      name: 'src',
      path: 'src',
      type: 'folder',
      children: [
        {
          name: 'index.js',
          path: 'src/index.js',
          type: 'file',
          content: '// Start coding here!\nconsole.log("Hello World");',
        },
      ],
    },
  ],
  activeFile: 'src/index.js',
  openFiles: ['src/index.js'],
  fileContents: {
    'src/index.js': '// Start coding here!\nconsole.log("Hello World");',
  },
  isAIAssisting: false,
  isMobileMenuOpen: false,
  openRouterApiKey: '',
  githubToken: '',
  showTerminal: true,
  showPreview: true,
  searchQuery: '',
  replaceQuery: '',
  packages: [
    { name: 'react', version: '19.0.0' },
    { name: 'next', version: '16.1.3' },
    { name: 'tailwindcss', version: '4.1.17' },
  ],
  gitStatus: { modified: ['src/index.js'], staged: [] },
  recentTemplates: [],
  
  setFiles: (files) => set({ files }),
  setFileContents: (contents) => set({ fileContents: contents }),
  setActiveFile: (path) => set({ activeFile: path }),
  setOpenFiles: (paths) => set({ openFiles: paths }),
  openFile: (path) =>
    set((state) => {
      const openFiles = state.openFiles.includes(path)
        ? state.openFiles
        : [...state.openFiles, path];
      return { openFiles, activeFile: path };
    }),
  closeFile: (path) =>
    set((state) => {
      const openFiles = state.openFiles.filter((p) => p !== path);
      const activeFile = state.activeFile === path ? openFiles[0] ?? null : state.activeFile;
      return { openFiles, activeFile };
    }),
  updateFileContent: (path, content) =>
    set((state) => ({
      fileContents: { ...state.fileContents, [path]: content },
      gitStatus: {
        ...state.gitStatus,
        modified: state.gitStatus.modified.includes(path)
          ? state.gitStatus.modified
          : [...state.gitStatus.modified, path],
      },
    })),
  setIsAIAssisting: (isAssisting) => set({ isAIAssisting: isAssisting }),
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setOpenRouterApiKey: (key) => set({ openRouterApiKey: key }),
  setGithubToken: (token) => set({ githubToken: token }),
  setShowTerminal: (show) => set({ showTerminal: show }),
  setShowPreview: (show) => set({ showPreview: show }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setReplaceQuery: (query) => set({ replaceQuery: query }),
  setPackages: (packages) => set({ packages }),
  addPackage: (pkg) =>
    set((state) => ({
      packages: state.packages.find((p) => p.name === pkg.name)
        ? state.packages
        : [...state.packages, pkg],
    })),
  removePackage: (name) =>
    set((state) => ({ packages: state.packages.filter((p) => p.name !== name) })),
  setGitStatus: (status) => set({ gitStatus: status }),
  addRecentTemplate: (templateId) =>
    set((state) => ({
      recentTemplates: [templateId, ...state.recentTemplates.filter((t) => t !== templateId)].slice(0, 5),
    })),
  
  addFile: (parentPath, name, type) =>
    set((state) => {
      const newPath = parentPath ? `${parentPath}/${name}` : name;
      const newNode: FileNode = {
        name,
        path: newPath,
        type,
        content: type === 'file' ? '' : undefined,
        children: type === 'folder' ? [] : undefined,
      };

      if (!parentPath) {
        return {
          files: [...state.files, newNode],
          fileContents:
            type === 'file'
              ? { ...state.fileContents, [newPath]: '' }
              : state.fileContents,
          openFiles: type === 'file' ? [...state.openFiles, newPath] : state.openFiles,
          activeFile: type === 'file' ? newPath : state.activeFile,
        };
      }
      const addToTree = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.path === parentPath && node.type === 'folder') {
            return {
              ...node,
              children: [
                ...(node.children || []),
                  newNode,
                ],
              };
          }
          if (node.children) {
            return { ...node, children: addToTree(node.children) };
          }
          return node;
        });
      };
      
      return {
        files: addToTree(state.files),
        fileContents:
          type === 'file'
            ? { ...state.fileContents, [newPath]: '' }
            : state.fileContents,
        openFiles: type === 'file' ? [...state.openFiles, newPath] : state.openFiles,
        activeFile: type === 'file' ? newPath : state.activeFile,
      };
    }),
    
  deleteFile: (path) =>
    set((state) => {
      const removeFromTree = (nodes: FileNode[]): FileNode[] => {
        return nodes
          .filter((node) => node.path !== path)
          .map((node) => ({
            ...node,
            children: node.children ? removeFromTree(node.children) : undefined,
          }));
      };
      
      const newFileContents = { ...state.fileContents };
      delete newFileContents[path];
      
      return {
        files: removeFromTree(state.files),
        fileContents: newFileContents,
        activeFile: state.activeFile === path ? null : state.activeFile,
        openFiles: state.openFiles.filter((p) => p !== path),
      };
    }),
}));
