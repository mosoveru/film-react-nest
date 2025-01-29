import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Films } from './films.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  daytime: string;

  @Column({
    nullable: false,
  })
  hall: number;

  @Column({
    nullable: false,
  })
  rows: number;

  @Column({
    nullable: false,
  })
  seats: number;

  @Column({
    type: 'double precision',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  taken: string;

  @ManyToOne(() => Films, (film) => film.schedules, {
    nullable: false,
  })
  film: Films;
}
