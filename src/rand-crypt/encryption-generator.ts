import * as crypto from 'crypto';

export interface IEncryptionResult {
  originalNumber: number;
  key: Buffer;
  encryptedValue: string;
}
export class EncryptionGenerator {
  private generateRandomNumber(): number {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }

  private generateEncryptionKey(): Buffer {
    return crypto.randomBytes(32); // Generate a 256-bit key
  }

  private encryptNumber(number: number, key: Buffer): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv); // Generate a random IV
    let encrypted = cipher.update(number.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + encrypted;
  }

  public generate(): {
    originalNumber: number;
    key: Buffer;
    encryptedValue: string;
  } {
    const originalNumber = this.generateRandomNumber();
    const key = this.generateEncryptionKey();
    const encryptedValue = this.encryptNumber(originalNumber, key);
    return { originalNumber, key, encryptedValue };
  }
}
