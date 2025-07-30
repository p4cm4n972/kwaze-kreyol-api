import { Test, TestingModule } from '@nestjs/testing';
import { WordSearchSessionService } from './word-search-session.service';

describe('WordSearchSessionService', () => {
  let service: WordSearchSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordSearchSessionService],
    }).compile();

    service = module.get<WordSearchSessionService>(WordSearchSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
