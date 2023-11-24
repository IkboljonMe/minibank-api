import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./helpers/User";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";
@Entity("client")
export class Client extends User {
  @Column({
    type: "numeric",
  })
  balance: number;
  @Column({
    name: "active",
    default: true,
  })
  is_active: boolean;
  @Column({
    type: "simple-json",
    nullable: true,
  })
  additonal_info: {
    age: number;
    hair_color: string;
  };
  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];
  @ManyToMany((type) => Banker, { cascade: true })
  bankers: Banker[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
