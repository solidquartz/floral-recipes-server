import {
  BaseEntity,
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Arrangement } from "./arrangement";

@Entity("arranged_flowers")
export class ArrangedFlower extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  arrangement_id: number;

  @Column()
  flower_id: number;

  @Column({ type: "numeric" })
  stem_quantity: number;

  @ManyToOne(() => Arrangement, (a) => a.arranged_flowers)
  arrangement: Arrangement;
}
