import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MotDocument = Mot & Document;

@Schema({ timestamps: true })
export class Mot {
  @Prop({ required: true })
  fr: string; // Mot en français

  @Prop({ required: true })
  kr: string; // Mot en créole

  @Prop({ type: String, enum: ['nom', 'verbe', 'adjectif', 'expression'], default: 'nom' })
  genre: 'nom' | 'verbe' | 'adjectif' | 'expression' | string;

  @Prop({ type: [String], default: [] })
  variantes: string[]; // autres orthographes ou formes

  @Prop({
    type: [
      {
        fr: { type: String },
        kr: { type: String },
      },
    ],
    default: [],
  })
  exemples: { fr: string; kr: string }[];

  @Prop({ default: false })
  validé: boolean;

  @Prop({ default: 0 })
  vues: number;
}

export const MotSchema = SchemaFactory.createForClass(Mot);
