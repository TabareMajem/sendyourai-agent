```typescript
import { TokenGenerator, Token } from './TokenGenerator';

export class InviteManager {
  private static readonly INVITE_STORAGE_KEY = 'ai_companion_invites';

  public static createInvite(userId: string, metadata?: Record<string, unknown>): string {
    const token = TokenGenerator.generateToken(userId, 'invite', metadata);
    this.storeInvite(token);
    return TokenGenerator.generateInviteUrl(token);
  }

  public static validateInvite(inviteId: string): Token | null {
    const invite = this.getInvite(inviteId);
    
    if (!invite || TokenGenerator.isTokenExpired(invite)) {
      this.removeInvite(inviteId);
      return null;
    }

    return invite;
  }

  private static storeInvite(token: Token): void {
    const invites = this.getAllInvites();
    invites.set(token.id, token);
    localStorage.setItem(
      this.INVITE_STORAGE_KEY, 
      JSON.stringify(Array.from(invites.entries()))
    );
  }

  private static getInvite(inviteId: string): Token | null {
    const invites = this.getAllInvites();
    return invites.get(inviteId) || null;
  }

  private static removeInvite(inviteId: string): void {
    const invites = this.getAllInvites();
    invites.delete(inviteId);
    localStorage.setItem(
      this.INVITE_STORAGE_KEY, 
      JSON.stringify(Array.from(invites.entries()))
    );
  }

  private static getAllInvites(): Map<string, Token> {
    try {
      const storedInvites = localStorage.getItem(this.INVITE_STORAGE_KEY);
      if (!storedInvites) return new Map();

      const inviteArray = JSON.parse(storedInvites);
      return new Map(inviteArray);
    } catch {
      return new Map();
    }
  }

  public static cleanupExpiredInvites(): void {
    const invites = this.getAllInvites();
    let hasExpired = false;

    for (const [id, invite] of invites) {
      if (TokenGenerator.isTokenExpired(invite)) {
        invites.delete(id);
        hasExpired = true;
      }
    }

    if (hasExpired) {
      localStorage.setItem(
        this.INVITE_STORAGE_KEY,
        JSON.stringify(Array.from(invites.entries()))
      );
    }
  }
}
```