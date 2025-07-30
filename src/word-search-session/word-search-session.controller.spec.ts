import { Test, TestingModule } from '@nestjs/testing';
import { WordSearchSessionController } from './word-search-session.controller';
import { WordSearchSessionService } from './word-search-session.service';

describe('WordSearchSessionController', () => {
  let controller: WordSearchSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordSearchSessionController],
      providers: [WordSearchSessionService],
    }).compile();

    controller = module.get<WordSearchSessionController>(WordSearchSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
