import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

@Controller('crypt')
export class RandCryptController {
  constructor(private readonly encryptionService: EncryptionService) { }

  @Get(':times')
  async performEncryption(
    @Param('times', ParseIntPipe) times: number,
  ): Promise<{ times: number; seconds: number; }> {
    const startTime = Date.now();
    await this.encryptionService.performEncryption(times);
    const endTime = Date.now();
    return {
      times,
      seconds: (endTime - startTime) / 1000,
      // results: results.map((r) => ({
      //   ...r,
      //   key: r.key.toString('hex'),
      // })),
    };
  }
}
