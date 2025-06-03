import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Region } from "../../region/entities/region.entity";
import { Service } from "../../service/entities/service.entity";
import { Review } from "../../review/entities/review.entity";
import { WorkshopSchedule } from "../../workshop_schedule/entities/workshop_schedule.entity";
import { Mechanic } from "../../mechanic/entities/mechanic.entity";
import { WorkshopService } from "../../workshop_service/entities/workshop_service.entity";


@Entity()
export class Workshop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "text" })
  address: string;

  @ManyToOne(() => Region, (region) => region.workshops)
  @JoinColumn({ name: "region_id" })
  region: Region;

  @Column({ type: "varchar", nullable: true })
  location: string;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @OneToMany(() => WorkshopSchedule, (schedule) => schedule.workshop)
  schedules: WorkshopSchedule[];

  @OneToMany(() => Review, (review) => review.workshop)
  reviews: Review[];

  @OneToMany(() => Mechanic, (review) => review.workshop)
  mechanics: Mechanic[];

  @OneToMany(() => WorkshopService, (ws) => ws.workshop)
  services: WorkshopService[];
}
