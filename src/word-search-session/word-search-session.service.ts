import { Injectable } from '@nestjs/common';
import { CreateWordSearchSessionDto } from './dto/create-word-search-session.dto';
import { UpdateWordSearchSessionDto } from './dto/update-word-search-session.dto';

@Injectable()
export class WordSearchSessionService {
  create(createWordSearchSessionDto: CreateWordSearchSessionDto) {
    return 'This action adds a new wordSearchSession';
  }

  findAll() {
    return `This action returns all wordSearchSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wordSearchSession`;
  }

  update(id: number, updateWordSearchSessionDto: UpdateWordSearchSessionDto) {
    return `This action updates a #${id} wordSearchSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} wordSearchSession`;
  }
}
