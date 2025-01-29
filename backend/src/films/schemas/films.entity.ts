import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedules } from './schedule.entity';

@Entity()
export class Films {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'double precision',
    nullable: false,
  })
  rating: number;

  @Column({
    nullable: false,
  })
  director: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  tags: string;

  @Column({
    nullable: false,
  })
  image: string;

  @Column({
    nullable: false,
  })
  cover: string;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  about: string;

  @Column({
    nullable: false,
  })
  description: string;

  @OneToMany(() => Schedules, (schedule) => schedule.film)
  schedules: Schedules[];
}
