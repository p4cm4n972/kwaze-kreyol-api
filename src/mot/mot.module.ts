import { Module } from '@nestjs/common';

import { MotService } from './mot.service';
import { MotController } from './mot.controller';
import { Mot, MotSchema } from './entities/mot.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mot.name, schema: MotSchema }]),
  ],
  controllers: [MotController],
  providers: [MotService ],
})
export class MotModule {
  
}


