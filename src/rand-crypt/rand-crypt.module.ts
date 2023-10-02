import { Module } from '@nestjs/common';
import { EncryptionGenerator } from './encryption-generator';
import { EncryptionService } from './encryption.service';
import { RandCryptController } from './rand-crypt.controller';

@Module({
  providers: [EncryptionGenerator, EncryptionService],
  controllers: [RandCryptController],
})
export class RandCryptModule { }