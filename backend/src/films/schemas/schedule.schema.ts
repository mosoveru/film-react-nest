import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Schedule {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: string;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
