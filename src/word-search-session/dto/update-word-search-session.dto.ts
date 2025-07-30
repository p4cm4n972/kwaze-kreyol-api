import { PartialType } from '@nestjs/mapped-types';
import { CreateWordSearchSessionDto } from './create-word-search-session.dto';

export class UpdateWordSearchSessionDto extends PartialType(CreateWordSearchSessionDto) {}
