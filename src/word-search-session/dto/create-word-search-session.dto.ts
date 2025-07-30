import { IsString, IsObject, IsDate } from 'class-validator';

export class CreateWordSearchSessionDto {
    @IsString()
    userId: string;

    @IsObject()
    gameState: Record<string, any>;

    @IsDate()
    updatedAt: Date;
}