import {
  BaseEntity,
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arrangement } from "./arrangement";
import { FlowerOrders } from "./flower_orders";

@Entity("projects")
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("timestamptz", { default: () => "NOW()" })
  date_created: Date;

  @Column("timestamptz", { default: () => "NOW()" })
  last_updated: Date;

  @Column("varchar", { nullable: true })
  project_name: string;

  @Column("boolean", { default: false })
  pinned: boolean;

  @Column("boolean", { default: true })
  active: boolean;

  @Column("timestamptz")
  event_date: Date;

  @OneToMany(() => Arrangement, (a) => a.project)
  arrangements: Arrangement[];

  @OneToMany(() => FlowerOrders, o => o.project)
  flower_orders: FlowerOrders[];
}
