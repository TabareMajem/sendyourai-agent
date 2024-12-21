import { ProjectManagementProvider } from './types';

export class AsanaClient implements ProjectManagementProvider {
  private accessToken: string;
  private baseUrl = 'https://app.asana.com/api/1.0';

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`Asana API error: ${response.statusText}`);
    }

    return response.json();
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.request('/users/me');
      return true;
    } catch {
      return false;
    }
  }

  async createBoard(options: {
    name: string;
    description?: string;
    defaultLists?: boolean;
  }): Promise<string> {
    const project = await this.request('/projects', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          name: options.name,
          notes: options.description
        }
      })
    });

    return project.data.gid;
  }

  async createList(options: {
    name: string;
    boardId: string;
  }): Promise<string> {
    const section = await this.request('/sections', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          name: options.name,
          project: options.boardId
        }
      })
    });

    return section.data.gid;
  }

  async createCard(options: {
    name: string;
    description?: string;
    listId: string;
    dueDate?: Date;
    labels?: string[];
  }): Promise<string> {
    const task = await this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          name: options.name,
          notes: options.description,
          memberships: [
            {
              section: options.listId
            }
          ],
          due_on: options.dueDate?.toISOString().split('T')[0]
        }
      })
    });

    return task.data.gid;
  }

  async moveCard(cardId: string, listId: string): Promise<void> {
    await this.request(`/tasks/${cardId}/addProject`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          section: listId
        }
      })
    });
  }

  async addComment(cardId: string, text: string): Promise<string> {
    const story = await this.request(`/tasks/${cardId}/stories`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          text: text
        }
      })
    });

    return story.data.gid;
  }
}