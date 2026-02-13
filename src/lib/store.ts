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
  fileContents: Record<string, string>;
  isAIAssisting: boolean;
  isMobileMenuOpen: boolean;
  openRouterApiKey: string;
  githubToken: string;
  
  setFiles: (files: FileNode[]) => void;
  setActiveFile: (path: string | null) => void;
  updateFileContent: (path: string, content: string) => void;
  setIsAIAssisting: (isAssisting: boolean) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  setOpenRouterApiKey: (key: string) => void;
  setGithubToken: (token: string) => void;
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
  fileContents: {
    'src/index.js': '// Start coding here!\nconsole.log("Hello World");',
  },
  isAIAssisting: false,
  isMobileMenuOpen: false,
  openRouterApiKey: '',
  githubToken: '',
  
  setFiles: (files) => set({ files }),
  setActiveFile: (path) => set({ activeFile: path }),
  updateFileContent: (path, content) =>
    set((state) => ({
      fileContents: { ...state.fileContents, [path]: content },
    })),
  setIsAIAssisting: (isAssisting) => set({ isAIAssisting: isAssisting }),
  setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setOpenRouterApiKey: (key) => set({ openRouterApiKey: key }),
  setGithubToken: (token) => set({ githubToken: token }),
  
  addFile: (parentPath, name, type) =>
    set((state) => {
      const newPath = `${parentPath}/${name}`;
      const addToTree = (nodes: FileNode[]): FileNode[] => {
        return nodes.map((node) => {
          if (node.path === parentPath && node.type === 'folder') {
            return {
              ...node,
              children: [
                ...(node.children || []),
                {
                  name,
                  path: newPath,
                  type,
                  content: type === 'file' ? '' : undefined,
                  children: type === 'folder' ? [] : undefined,
                },
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
      };
    }),
}));
