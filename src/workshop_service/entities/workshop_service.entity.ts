import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { Service } from "../../service/entities/service.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class WorkshopService {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: "Unique ID" })
  id: number;

  @ManyToOne(() => Workshop, (workshop) => workshop.services)
  @ApiProperty({ type: () => Workshop, description: "Workshop entity" })
  workshop: Workshop;

  @ManyToOne(() => Service, (service) => service.workshops)
  @ApiProperty({ type: () => Service, description: "Service entity" })
  service: Service;
}
