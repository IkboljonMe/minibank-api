import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client";
import { moneyColumn } from "./helpers/money";
export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}
@Entity("transaction")
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: "enum",
    enum: TransactionType,
  })
  type: TransactionType;
  @Column(moneyColumn)
  amount: number;
  @ManyToOne(() => Client, (client) => client.transactions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "client_id",
  })
  client: Client;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
