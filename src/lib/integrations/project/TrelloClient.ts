import { ProjectManagementProvider } from './types';

export class TrelloClient implements ProjectManagementProvider {
  private apiKey: string;
  private token: string;
  private baseUrl = 'https://api.trello.com/1';

  constructor(apiKey: string, token: string) {
    this.apiKey = apiKey;
    this.token = token;
  }

  private async request(method: string, endpoint: string, data?: any): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('key', this.apiKey);
    url.searchParams.append('token', this.token);

    const response = await fetch(url.toString(), {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Trello API error: ${response.statusText}`);
    }

    return response.json();
  }

  async isConnected(): Promise<boolean> {
    try {
      await this.request('GET', '/members/me');
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
    const board = await this.request('POST', '/boards', {
      name: options.name,
      desc: options.description,
      defaultLists: options.defaultLists
    });

    return board.id;
  }

  async createList(options: {
    name: string;
    boardId: string;
  }): Promise<string> {
    const list = await this.request('POST', '/lists', {
      name: options.name,
      idBoard: options.boardId
    });

    return list.id;
  }

  async createCard(options: {
    name: string;
    description?: string;
    listId: string;
    dueDate?: Date;
    labels?: string[];
  }): Promise<string> {
    const card = await this.request('POST', '/cards', {
      name: options.name,
      desc: options.description,
      idList: options.listId,
      due: options.dueDate?.toISOString(),
      idLabels: options.labels
    });

    return card.id;
  }

  async moveCard(cardId: string, listId: string): Promise<void> {
    await this.request('PUT', `/cards/${cardId}`, {
      idList: listId
    });
  }

  async addComment(cardId: string, text: string): Promise<string> {
    const comment = await this.request('POST', `/cards/${cardId}/actions/comments`, {
      text
    });
    return comment.id;
  }
}