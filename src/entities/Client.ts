import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./helpers/User";
import { moneyColumn } from "./helpers/money";
import { Transaction } from "./Transaction";
import { Banker } from "./Banker";
@Entity("client")
export class Client extends User {
  @Column(moneyColumn)
  balance: number;
  @OneToMany(() => Transaction, (transaction) => transaction.client)
  transactions: Transaction[];
  @ManyToMany(() => Banker, (banker) => banker.clients, {
    onDelete: "CASCADE",
  })
  bankers: Banker[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
