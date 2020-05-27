/* eslint-disable camelcase */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("failures_origin")
class Failure_Origin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  type: string;

  @Column()
  origin: string;

  @UpdateDateColumn()
  Updated_at: Date;

  @UpdateDateColumn()
  Created_at: Date;
}

export default Failure_Origin;
