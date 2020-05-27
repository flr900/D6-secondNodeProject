/* eslint-disable camelcase */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  role_name: string;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Role;
