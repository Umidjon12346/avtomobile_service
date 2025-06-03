import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { Service } from "../../service/entities/service.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class WorkshopService {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique ID" })
  id: number;

  @ManyToOne(() => Workshop, (workshop) => workshop.services, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @ApiProperty({ type: () => Workshop, description: "Workshop entity" })
  workshop: Workshop;

  @ManyToOne(() => Service, (service) => service.workshops, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @ApiProperty({ type: () => Service, description: "Service entity" })
  service: Service;
}
