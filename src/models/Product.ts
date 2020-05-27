/* eslint-disable camelcase */
import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  host: string;

  @Column()
  avatar_link: string;

  @Column()
  initial_time: Date;

  @Column()
  end_time: Date;

  @Column()
  studio: string;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Product;
