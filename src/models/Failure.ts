/* eslint-disable camelcase */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import Report from "./Report";
import Failure_Origin from "./Failure_Origin";

@Entity("failures")
class Failure {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: "incident" | "ocurrence";

  @Column()
  time: Date;

  @Column("time with time zone")
  duration: Date;

  @ManyToOne(() => Report, (report) => report.failures)
  report: Report;

  @ManyToOne(() => Failure_Origin)
  failure_origin_id: Failure_Origin[];

  @Column()
  ticket: string;

  @Column()
  effect: string;

  @Column()
  description: string;

  @Column()
  failure_category: "X" | "A" | "B" | "C";

  @UpdateDateColumn()
  Updated_at: string;

  @UpdateDateColumn()
  Created_at: string;
}

export default Failure;
