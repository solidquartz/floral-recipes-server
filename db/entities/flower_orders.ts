import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project";

@Entity("flower_orders")
export class FlowerOrders extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  flower_id: number;

  @Column({ nullable: true })
  num_to_order: number;

  @ManyToOne(() => Project, (p) => p.flower_orders)
  project: Project;
}
