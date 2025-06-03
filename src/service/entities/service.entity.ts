import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { Order } from "../../order/entities/order.entity";
import { WorkshopService } from "../../workshop_service/entities/workshop_service.entity";


@Entity()
export class Service {
  @ApiProperty({ example: 1, description: "Auto-generated primary key" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Oil Change",
    description: "Name of the service",
  })
  @Column()
  name: string;

  @ApiProperty({
    example: "Complete engine oil replacement with filter change",
    description: "Detailed description of the service",
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: 49.99,
    description: "Price of the service in USD",
    type: "number",
    format: "float",
  })
  @Column()
  price: number;

  @ApiProperty({
    example: true,
    description: "Whether the service is currently available",
    default: true,
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    type: () => Workshop,
    isArray: true,
    description: "Workshops that offer this service",
  })
  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];

  @OneToMany(() => WorkshopService, (ws) => ws.service)
  workshops: WorkshopService[];
}
