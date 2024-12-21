import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const TokenSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  type: z.enum(['access', 'refresh', 'invite']),
  metadata: z.record(z.unknown()).optional()
});

export type Token = z.infer<typeof TokenSchema>;

export class TokenGenerator {
  private static readonly TOKEN_EXPIRY = {
    access: 1 * 60 * 60 * 1000, // 1 hour
    refresh: 7 * 24 * 60 * 60 * 1000, // 7 days
    invite: 24 * 60 * 60 * 1000 // 24 hours
  };

  public static generateToken(userId: string, type: Token['type'], metadata?: Record<string, unknown>): Token {
    const token: Token = {
      id: uuidv4(),
      userId,
      type,
      expiresAt: new Date(Date.now() + this.TOKEN_EXPIRY[type]),
      metadata
    };

    TokenSchema.parse(token); // Validate token structure
    return token;
  }

  public static generateInviteUrl(token: Token): string {
    if (token.type !== 'invite') {
      throw new Error('Invalid token type for invite URL');
    }
    return `${window.location.origin}/invite/${token.id}`;
  }

  public static isTokenExpired(token: Token): boolean {
    return new Date() > token.expiresAt;
  }

  public static validateToken(token: Token): boolean {
    try {
      TokenSchema.parse(token);
      return !this.isTokenExpired(token);
    } catch {
      return false;
    }
  }
}