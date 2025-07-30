import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordBrokenSessionService } from './word-broken-session.service';
import { CreateWordBrokenSessionDto } from './dto/create-word-broken-session.dto';
import { UpdateWordBrokenSessionDto } from './dto/update-word-broken-session.dto';

@Controller('word-broken-session')
export class WordBrokenSessionController {
  constructor(private readonly wordBrokenSessionService: WordBrokenSessionService) {}

  @Post()
  create(@Body() createWordBrokenSessionDto: CreateWordBrokenSessionDto) {
    return this.wordBrokenSessionService.create(createWordBrokenSessionDto);
  }

  @Get()
  findAll() {
    return this.wordBrokenSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordBrokenSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordBrokenSessionDto: UpdateWordBrokenSessionDto) {
    return this.wordBrokenSessionService.update(+id, updateWordBrokenSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordBrokenSessionService.remove(+id);
  }
}
