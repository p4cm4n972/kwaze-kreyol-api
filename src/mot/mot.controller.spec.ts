import { Test, TestingModule } from '@nestjs/testing';
import { MotController } from './mot.controller';
import { MotService } from './mot.service';

describe('MotController', () => {
  let controller: MotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MotController],
      providers: [MotService],
    }).compile();

    controller = module.get<MotController>(MotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
