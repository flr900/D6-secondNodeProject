import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Product from './Product';
import Admin from './Admin';
import Role from './Role';

@Entity('exibitions')
class Exibition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, product => product.exibitions)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  admin_id: string;

  @ManyToOne(() => Admin)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  start_time: Date;

  @Column()
  finish_time: Date;

  @Column()
  ready_time: Date;

  @Column()
  exibition_date: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Exibition;
