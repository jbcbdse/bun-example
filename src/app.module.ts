import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandCryptModule } from './rand-crypt/rand-crypt.module';

@Module({
  imports: [RandCryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
