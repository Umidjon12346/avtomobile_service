import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Region } from "../../region/entities/region.entity";

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

//   @OneToMany(() => WorkshopSchedule, (schedule) => schedule.workshop)
//   schedules: WorkshopSchedule[];

//   @OneToMany(() => Review, (review) => review.workshop)
//   reviews: Review[];

//   @ManyToMany(() => Service)
//   @JoinTable({
//     name: "workshops_services",
//     joinColumn: { name: "workshop_id", referencedColumnName: "id" },
//     inverseJoinColumn: { name: "service_id", referencedColumnName: "id" },
//   })
//   services: Service[];
}
