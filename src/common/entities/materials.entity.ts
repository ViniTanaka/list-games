import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('materials')
export class Materials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}
