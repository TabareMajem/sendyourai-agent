import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { StorageProvider } from './types';
import { AppError, ErrorCodes } from '../../utils/errors';

export class GoogleDriveClient implements StorageProvider {
  private oauth2Client: OAuth2Client;
  private drive: any;

  constructor(credentials: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }) {
    this.oauth2Client = new google.auth.OAuth2(
      credentials.clientId,
      credentials.clientSecret,
      credentials.redirectUri
    );

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.drive.about.get({ fields: 'user' });
      return true;
    } catch {
      return false;
    }
  }

  async uploadFile(file: {
    name: string;
    content: Buffer | string;
    mimeType: string;
    folderId?: string;
  }): Promise<string> {
    try {
      const fileMetadata = {
        name: file.name,
        parents: file.folderId ? [file.folderId] : undefined
      };

      const media = {
        mimeType: file.mimeType,
        body: file.content
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id'
      });

      return response.data.id;
    } catch (error) {
      throw new AppError(
        'Failed to upload file to Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { fileName: file.name }
      );
    }
  }

  async downloadFile(fileId: string): Promise<Buffer> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media'
      }, { responseType: 'arraybuffer' });

      return Buffer.from(response.data);
    } catch (error) {
      throw new AppError(
        'Failed to download file from Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { fileId }
      );
    }
  }

  async createFolder(name: string, parentId?: string): Promise<string> {
    try {
      const fileMetadata = {
        name: name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: parentId ? [parentId] : undefined
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        fields: 'id'
      });

      return response.data.id;
    } catch (error) {
      throw new AppError(
        'Failed to create folder in Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { folderName: name }
      );
    }
  }

  async listFiles(options: {
    folderId?: string;
    pageSize?: number;
    query?: string;
  } = {}): Promise<any[]> {
    try {
      let query = options.query || '';
      if (options.folderId) {
        query = `'${options.folderId}' in parents ${query ? `and ${query}` : ''}`;
      }

      const response = await this.drive.files.list({
        q: query || undefined,
        pageSize: options.pageSize || 100,
        fields: 'files(id, name, mimeType, createdTime, modifiedTime, size)'
      });

      return response.data.files;
    } catch (error) {
      throw new AppError(
        'Failed to list files from Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500
      );
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({
        fileId: fileId
      });
    } catch (error) {
      throw new AppError(
        'Failed to delete file from Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { fileId }
      );
    }
  }

  async shareFile(fileId: string, email: string, role: 'reader' | 'writer' | 'commenter'): Promise<void> {
    try {
      await this.drive.permissions.create({
        fileId: fileId,
        requestBody: {
          type: 'user',
          role: role,
          emailAddress: email
        }
      });
    } catch (error) {
      throw new AppError(
        'Failed to share file on Google Drive',
        ErrorCodes.INTEGRATION_ERROR,
        500,
        { fileId, email }
      );
    }
  }
}