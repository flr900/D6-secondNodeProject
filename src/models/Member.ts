/* eslint-disable camelcase */
import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('members')
class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_id: string;

  @Column()
  full_name: string;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Member;
