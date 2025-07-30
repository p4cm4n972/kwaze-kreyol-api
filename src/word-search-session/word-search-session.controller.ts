import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WordSearchSessionService } from './word-search-session.service';
import { CreateWordSearchSessionDto } from './dto/create-word-search-session.dto';
import { UpdateWordSearchSessionDto } from './dto/update-word-search-session.dto';

@Controller('api/word-search-session')
export class WordSearchSessionController {
  constructor(private readonly wordSearchSessionService: WordSearchSessionService) {}

  @Post('save')
  create(@Body() createWordSearchSessionDto: CreateWordSearchSessionDto) {
    return this.wordSearchSessionService.create(createWordSearchSessionDto);
  }


  @Get('load')
  findAll() {
    return this.wordSearchSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordSearchSessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordSearchSessionDto: UpdateWordSearchSessionDto) {
    return this.wordSearchSessionService.update(+id, updateWordSearchSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordSearchSessionService.remove(+id);
  }
}
