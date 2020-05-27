import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Member from './Member';
import Failure from './Failure';
import Exibition from './Exibition';

@Entity('reports')
class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exibition_id: string;

  @OneToOne(() => Exibition)
  @JoinColumn()
  exibition: Exibition;

  @Column()
  failures_id: string;

  @OneToMany(() => Failure, failure => failure.id)
  failures: Failure[];

  @Column()
  members_id: string;

  @ManyToMany(() => Member)
  @JoinTable()
  members: Member[];

  @Column()
  comments: string;

  @UpdateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  created_at: Date;
}

export default Report;
