import { Module } from '@nestjs/common';
import { WordBrokenSessionService } from './word-broken-session.service';
import { WordBrokenSessionController } from './word-broken-session.controller';

@Module({
  controllers: [WordBrokenSessionController],
  providers: [WordBrokenSessionService],
})
export class WordBrokenSessionModule {}
