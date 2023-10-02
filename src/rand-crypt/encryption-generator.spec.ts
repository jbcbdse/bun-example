import { EncryptionGenerator } from './encryption-generator';
import * as crypto from 'crypto';

describe('EncryptionGenerator', () => {
  let encryptionGenerator: EncryptionGenerator;

  beforeEach(() => {
    encryptionGenerator = new EncryptionGenerator();
  });

  test('generate should return original number, key, and encrypted value', () => {
    const result = encryptionGenerator.generate();
    expect(typeof result.originalNumber).toBe('number');
    expect(Buffer.isBuffer(result.key)).toBe(true);
    expect(typeof result.encryptedValue).toBe('string');
  });

  test('encrypted value should decrypt back to original number', () => {
    const result = encryptionGenerator.generate();
    const iv = Buffer.from(result.encryptedValue.slice(0, 32), 'hex');
    const encryptedData = result.encryptedValue.slice(32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', result.key, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    expect(Number(decrypted)).toBe(result.originalNumber);
  });
});
