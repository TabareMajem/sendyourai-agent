export interface StorageProvider {
  isConnected(): Promise<boolean>;
  
  uploadFile(file: {
    name: string;
    content: Buffer | string;
    mimeType: string;
    folderId?: string;
  }): Promise<string>;

  downloadFile(fileId: string): Promise<Buffer>;
  
  createFolder(name: string, parentId?: string): Promise<string>;
  
  listFiles(options?: {
    folderId?: string;
    pageSize?: number;
    query?: string;
  }): Promise<any[]>;
  
  deleteFile(fileId: string): Promise<void>;
  
  shareFile(fileId: string, email: string, role: 'reader' | 'writer' | 'commenter'): Promise<void>;
}