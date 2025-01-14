import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Schedule, ScheduleSchema } from './schedule.schema';

@Schema()
export class Film {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop([ScheduleSchema])
  schedule: Schedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

export type FilmDocumentOverride = {
  schedule: Types.DocumentArray<Schedule>;
};

export type FilmDocument = HydratedDocument<Film, FilmDocumentOverride>;
