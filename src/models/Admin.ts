/* eslint-disable camelcase */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Role from './Role';

@Entity('admins')
class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  role_id: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Admin;
