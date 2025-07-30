import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { CreateMotDto } from './dto/create-mot.dto';
import { UpdateMotDto } from './dto/update-mot.dto';
import { MotService } from './mot.service';
import { Mot } from './entities/mot.entity';

@Controller('api/mot')
export class MotController {
  constructor(private readonly motService: MotService) { }

  @Post()
  create(@Body() createMotDto: CreateMotDto) {
    return this.motService.create(createMotDto);
  }

  @Post('batch')
  async createMany(@Body() mots: CreateMotDto[]) {
    if (!Array.isArray(mots)) {
      throw new BadRequestException('Le corps de la requête doit être un tableau');
    }
    return this.motService.createMany(mots);
  }


  @Get()
  findAll() {
    return this.motService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMotDto: UpdateMotDto) {
    return this.motService.update(+id, updateMotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motService.remove(+id);
  }
}
