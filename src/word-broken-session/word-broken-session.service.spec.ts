import { Test, TestingModule } from '@nestjs/testing';
import { WordBrokenSessionService } from './word-broken-session.service';

describe('WordBrokenSessionService', () => {
  let service: WordBrokenSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordBrokenSessionService],
    }).compile();

    service = module.get<WordBrokenSessionService>(WordBrokenSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
