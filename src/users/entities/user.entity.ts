import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
