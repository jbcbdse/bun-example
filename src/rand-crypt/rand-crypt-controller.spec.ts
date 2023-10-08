import { Test, TestingModule } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';
import { RandCryptController } from './rand-crypt.controller';
import { EncryptionService } from './encryption.service';
import { EncryptionGenerator } from './encryption-generator';
global.jest = jest;

describe('RandCryptController', () => {
  let randCryptController: RandCryptController;
  let encryptionService: MockProxy<EncryptionService>;

  beforeEach(async () => {
    encryptionService = mock<EncryptionService>();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandCryptController],
      providers: [
        { provide: EncryptionService, useValue: encryptionService },
        EncryptionGenerator,
      ],
    }).compile();

    randCryptController = module.get<RandCryptController>(RandCryptController);
  });

  test('should be defined', () => {
    expect(randCryptController).toBeDefined();
  });

  test('performEncryption should return correct structure', async () => {
    const times = 5;
    encryptionService.performEncryption.mockReturnValue([
      {
        originalNumber: 123,
        key: Buffer.from('key'),
        encryptedValue: 'encrypted',
      },
      // ... more mock results
    ] as any);

    const result = await randCryptController.performEncryption(times);

    expect(result.times).toBe(times);
    expect(typeof result.seconds).toBe('number');
    // expect(Array.isArray(result.results)).toBe(true);
  });
});
