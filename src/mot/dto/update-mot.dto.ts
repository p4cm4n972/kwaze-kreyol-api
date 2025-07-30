import { PartialType } from '@nestjs/mapped-types';
import { CreateMotDto } from './create-mot.dto';

export class UpdateMotDto extends PartialType(CreateMotDto) {}
