import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ArrangedFlower } from "./arranged_flower";
import { Project } from "./project";

@Entity("arrangements")
export class Arrangement extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @Column({ nullable: true })
  arrangement_name: string;

  @Column()
  arrangement_quantity: number;

  @ManyToOne(() => Project, (p) => p.arrangements)
  project: Project;

  @OneToMany(() => ArrangedFlower, (af) => af.arrangement)
  arranged_flowers: ArrangedFlower[];
}
