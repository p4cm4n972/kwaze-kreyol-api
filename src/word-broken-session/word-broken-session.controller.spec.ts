import { Test, TestingModule } from '@nestjs/testing';
import { WordBrokenSessionController } from './word-broken-session.controller';
import { WordBrokenSessionService } from './word-broken-session.service';

describe('WordBrokenSessionController', () => {
  let controller: WordBrokenSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordBrokenSessionController],
      providers: [WordBrokenSessionService],
    }).compile();

    controller = module.get<WordBrokenSessionController>(WordBrokenSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
