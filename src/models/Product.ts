import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import Exibition from './Exibition';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  alias: string;

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

  @OneToMany(() => Exibition, exibition => exibition.product)
  exibitions: Exibition[];
}

export default Product;
