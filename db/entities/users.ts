import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { nullable: false })
  username: string;

  @Column("text", { nullable: false })
  password: string;
}
