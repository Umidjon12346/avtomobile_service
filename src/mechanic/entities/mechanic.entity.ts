import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class Mechanic {
  @ApiProperty({ example: 1, description: "Mexanikning ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Aliyev Valijon",
    description: "Mexanikning toʻliq ismi",
  })
  @Column("varchar", { length: 255 })
  full_name: string;

  @ApiProperty({
    type: () => Workshop,
    description: "Mexanik biriktirilgan ustaxona",
  })
  @ManyToOne(() => Workshop, (workshop) => workshop.mechanics)
  workshop: Workshop;

  @ApiPropertyOptional({
    example: 5,
    description: "Mexanikning tajriba yili",
    nullable: true,
  })
  @Column("int", { nullable: true })
  experience: number;

  @ApiPropertyOptional({
    example: true,
    description: "Mexanik band emasligi",
    nullable: true,
  })
  @Column("boolean", { nullable: true })
  is_available: boolean;

  @ApiProperty({
    type: () => [Order],
    description: "Mexanikga biriktirilgan buyurtmalar",
  })
  @OneToMany(() => Order, (order) => order.mechanic)
  orders: Order[];
}
