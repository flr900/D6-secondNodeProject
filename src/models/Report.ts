/* eslint-disable camelcase */
import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import Member from "./Member";
import Failure from "./Failure";

@Entity("reports")
class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  exibition_id: string;

  @OneToMany(() => Failure, (failure) => failure.id)
  failures: Failure[];

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
