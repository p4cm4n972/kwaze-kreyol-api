import { Test, TestingModule } from '@nestjs/testing';
import { MotService } from './mot.service';

describe('MotService', () => {
  let service: MotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MotService],
    }).compile();

    service = module.get<MotService>(MotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
