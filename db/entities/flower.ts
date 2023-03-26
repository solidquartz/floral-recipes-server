import { BaseEntity, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("flowers")
export class Flower extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  flower_name: string;

  @Column({ type: 'numeric', nullable: false })
  stem_price: number;

  @Column()
  rounded_up: number;
}
