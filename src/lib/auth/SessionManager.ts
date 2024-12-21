```typescript
import { z } from 'zod';
import { TokenGenerator, Token } from './TokenGenerator';

const SessionSchema = z.object({
  userId: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresAt: z.date()
});

export type Session = z.infer<typeof SessionSchema>;

export class SessionManager {
  private static readonly SESSION_KEY = 'ai_companion_session';
  private static readonly REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  public static async createSession(userId: string): Promise<Session> {
    const accessToken = TokenGenerator.generateToken(userId, 'access');
    const refreshToken = TokenGenerator.generateToken(userId, 'refresh');

    const session: Session = {
      userId,
      accessToken: accessToken.id,
      refreshToken: refreshToken.id,
      expiresAt: accessToken.expiresAt
    };

    SessionSchema.parse(session); // Validate session structure
    this.saveSession(session);

    return session;
  }

  public static getSession(): Session | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const session = JSON.parse(sessionData);
      SessionSchema.parse(session); // Validate stored session

      if (this.isSessionExpired(session)) {
        this.clearSession();
        return null;
      }

      if (this.shouldRefreshSession(session)) {
        this.refreshSession(session);
      }

      return session;
    } catch {
      this.clearSession();
      return null;
    }
  }

  private static saveSession(session: Session): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  }

  public static clearSession(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  private static isSessionExpired(session: Session): boolean {
    return new Date() > new Date(session.expiresAt);
  }

  private static shouldRefreshSession(session: Session): boolean {
    const timeUntilExpiry = new Date(session.expiresAt).getTime() - Date.now();
    return timeUntilExpiry <= this.REFRESH_THRESHOLD;
  }

  private static async refreshSession(session: Session): Promise<Session> {
    try {
      const newSession = await this.createSession(session.userId);
      this.saveSession(newSession);
      return newSession;
    } catch (error) {
      this.clearSession();
      throw error;
    }
  }
}
```