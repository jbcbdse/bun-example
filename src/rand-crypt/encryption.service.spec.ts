import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { EncryptionGenerator } from './encryption-generator';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  let encryptionService: EncryptionService;
  let encryptionGenerator: MockProxy<EncryptionGenerator>;

  beforeEach(async () => {
    encryptionGenerator = mock<EncryptionGenerator>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        {
          provide: EncryptionGenerator,
          useValue: encryptionGenerator,
        },
      ],
    }).compile();

    encryptionService = module.get<EncryptionService>(EncryptionService);
  });

  test('performEncryption should call generate method the specified number of times', () => {
    const times = 20;
    encryptionGenerator.generate.mockReturnValue({
      originalNumber: 123,
      key: Buffer.from('key'),
      encryptedValue: 'encrypted',
    });

    const result = encryptionService.performEncryption(times);

    expect(encryptionGenerator.generate).toHaveBeenCalledTimes(times);
    expect(result).toHaveLength(times);
    result.forEach((item) => {
      expect(item).toEqual({
        originalNumber: 123,
        key: Buffer.from('key'),
        encryptedValue: 'encrypted',
      });
    });
  });
});
