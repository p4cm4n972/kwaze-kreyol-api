import { PartialType } from '@nestjs/mapped-types';
import { CreateWordBrokenSessionDto } from './create-word-broken-session.dto';

export class UpdateWordBrokenSessionDto extends PartialType(CreateWordBrokenSessionDto) {}
