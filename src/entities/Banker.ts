import { User } from "./helpers/User";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
@Entity("banker")
export class Banker extends User {
  @Column({
    unique: true,
  })
  employee_number: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
