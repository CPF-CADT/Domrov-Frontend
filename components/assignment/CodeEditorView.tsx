"use client";

import { useState, useEffect } from "react";
import IDE from "./IDE";

interface FileItem {
  name: string;
  path: string;
  content: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

interface CodeEditorViewProps {
  files: FileItem[];
  onClose: () => void;
}

export default function CodeEditorView({ files, onClose }: CodeEditorViewProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [openTabs, setOpenTabs] = useState<FileItem[]>([]);
  const [fileTree, setFileTree] = useState<FileItem[]>([]);

  useEffect(() => {
    // Build file tree from flat file list
    const tree = buildFileTree(files);
    setFileTree(tree);
    
    // Auto-select first file
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setOpenTabs([files[0]]);
    }
  }, [files]);

  const buildFileTree = (flatFiles: FileItem[]): FileItem[] => {
    const tree: FileItem[] = [];
    
    flatFiles.forEach(file => {
      const parts = file.path.split('/');
      let current = tree;
      
      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          // It's a file
          current.push(file);
        } else {
          // It's a folder
          let folder = current.find(item => item.name === part && item.type === 'folder');
          if (!folder) {
            folder = {
              name: part,
              path: parts.slice(0, index + 1).join('/'),
              content: '',
              type: 'folder',
              children: []
            };
            current.push(folder);
          }
          current = folder.children!;
        }
      });
    });
    
    return tree;
  };

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'file') {
      setSelectedFile(file);
      if (!openTabs.find(tab => tab.path === file.path)) {
        setOpenTabs([...openTabs, file]);
      }
    }
  };

  const handleCloseTab = (file: FileItem) => {
    const newTabs = openTabs.filter(tab => tab.path !== file.path);
    setOpenTabs(newTabs);
    if (selectedFile?.path === file.path) {
      setSelectedFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const iconMap: Record<string, string> = {
      'js': '📜',
      'jsx': '⚛️',
      'ts': '📘',
      'tsx': '⚛️',
      'py': '🐍',
      'java': '☕',
      'cpp': '⚙️',
      'c': '⚙️',
      'html': '🌐',
      'css': '🎨',
      'json': '📋',
      'md': '📝',
      'txt': '📄',
    };
    return iconMap[ext || ''] || '📄';
  };

  const FileTreeItem = ({ item, depth = 0 }: { item: FileItem; depth?: number }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    if (item.type === 'folder') {
      return (
        <div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer group"
            style={{ paddingLeft: `${depth * 12 + 12}px` }}
          >
            <span className="text-purple-600 text-sm">{isOpen ? '📂' : '📁'}</span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-purple-700">{item.name}</span>
          </div>
          {isOpen && item.children?.map((child, idx) => (
            <FileTreeItem key={idx} item={child} depth={depth + 1} />
          ))}
        </div>
      );
    }
    
    return (
      <div
        onClick={() => handleFileClick(item)}
        className={`flex items-center gap-2 px-3 py-1.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer group ${
          selectedFile?.path === item.path ? 'bg-linear-to-r from-blue-100 to-indigo-100' : ''
        }`}
        style={{ paddingLeft: `${depth * 12 + 12}px` }}
      >
        <span className="text-sm">{getFileIcon(item.name)}</span>
        <span className={`text-sm ${selectedFile?.path === item.path ? 'font-semibold text-blue-700' : 'text-slate-600 group-hover:text-blue-600'}`}>
          {item.name}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-linear-to-r from-slate-800 to-purple-800 border-b border-purple-600/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer" onClick={onClose}></div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all shadow-lg"
        >
          ← Back to Assignment
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - File Explorer */}
        <div className="w-72 bg-linear-to-b from-slate-800 to-slate-900 border-r border-purple-600/30 flex flex-col">
          <div className="px-4 py-3 border-b border-purple-600/30">
            <h2 className="text-white font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
              <span>📁</span> Files Explorer
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {fileTree.map((item, idx) => (
              <FileTreeItem key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col bg-slate-900">
          {/* Tabs */}
          {openTabs.length > 0 && (
            <div className="flex items-center gap-1 bg-slate-800 border-b border-purple-600/30 px-2 py-1 overflow-x-auto">
              {openTabs.map((tab, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedFile(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-t-lg cursor-pointer group transition-all ${
                    selectedFile?.path === tab.path
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <span className="text-sm">{getFileIcon(tab.name)}</span>
                  <span className="text-sm font-medium">{tab.name.split('/').pop()}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseTab(tab);
                    }}
                    className="ml-2 hover:bg-white/20 rounded p-0.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Editor */}
          <div className="flex-1">
            {selectedFile ? (
              <IDE
                file={{
                  type: 'file',
                  name: selectedFile.name,
                  path: selectedFile.path,
                  content: selectedFile.content
                }}
                readOnly={true}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📂</div>
                  <p className="text-lg">Select a file to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.7);
        }
      `}</style>
    </div>
  );
}
