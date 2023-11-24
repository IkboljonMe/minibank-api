import { Client } from "./Client";
import { User } from "./helpers/User";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from "typeorm";
@Entity("banker")
export class Banker extends User {
  @Column({
    unique: true,
  })
  employee_number: string;
  @ManyToMany((type) => Client, {
    cascade: true,
  })
  @JoinTable({
    name: "bankers_clients",
    joinColumn: {
      name: "banker",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "client",
      referencedColumnName: "id",
    },
  })
  clients: Client[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
