import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { User } from "./helpers/User";
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
  @Column({
    type: "simple-array",
    default: [],
  })
  family_members: string[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
