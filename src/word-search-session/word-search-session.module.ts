import { Module } from '@nestjs/common';
import { WordSearchSessionService } from './word-search-session.service';
import { WordSearchSessionController } from './word-search-session.controller';

@Module({
  controllers: [WordSearchSessionController],
  providers: [WordSearchSessionService],
})
export class WordSearchSessionModule {}
