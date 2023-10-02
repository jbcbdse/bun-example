import { Injectable } from '@nestjs/common';
import { IEncryptionResult, EncryptionGenerator } from './encryption-generator';

@Injectable()
export class EncryptionService {
  constructor(private readonly encryptionGenerator: EncryptionGenerator) { }

  public performEncryption(times: number): IEncryptionResult[] {
    const results = [];
    for (let i = 0; i < times; i++) {
      const result = this.encryptionGenerator.generate();
      results.push(result);
    }
    return results;
  }
}
