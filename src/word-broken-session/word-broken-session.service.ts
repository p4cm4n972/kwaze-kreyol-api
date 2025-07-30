import { Injectable } from '@nestjs/common';
import { CreateWordBrokenSessionDto } from './dto/create-word-broken-session.dto';
import { UpdateWordBrokenSessionDto } from './dto/update-word-broken-session.dto';

@Injectable()
export class WordBrokenSessionService {
  create(createWordBrokenSessionDto: CreateWordBrokenSessionDto) {
    return 'This action adds a new wordBrokenSession';
  }

  findAll() {
    return `This action returns all wordBrokenSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordBrokenSession`;
  }

  update(id: number, updateWordBrokenSessionDto: UpdateWordBrokenSessionDto) {
    return `This action updates a #${id} wordBrokenSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordBrokenSession`;
  }
}
