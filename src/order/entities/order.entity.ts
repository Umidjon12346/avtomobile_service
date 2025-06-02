import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { OrderProduct } from "../../order_product/entities/order_product.entity";
import { Payment } from "../../payment/entities/payment.entity";
import { User } from "../../users/entities/user.entity";
import { Mechanic } from "../../mechanic/entities/mechanic.entity";
import { Service } from "../../service/entities/service.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Order {
  @ApiProperty({
    example: 1,
    description: "The unique identifier of the order",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => User,
    description: "The user who placed the order",
  })

  
  @ManyToOne(() => User, (user) => user.orders)
  user: User;


  @ApiProperty({
    type: () => Mechanic,
    description: "The mechanic assigned to the order",
    nullable: true,
  })
  @ManyToOne(() => Mechanic, (mechanic) => mechanic.orders)
  mechanic: Mechanic;

  @ApiProperty({
    type: () => Service,
    description: "The service requested in the order",
  })
  @ManyToOne(() => Service, (service) => service.orders)
  service: Service;

  @ApiProperty({
    example: "pending",
    description: "Current status of the order",
    enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
    nullable: true,
  })
  @Column("varchar", { length: 50, nullable: true })
  status: string;

  @ApiProperty({
    example: 199.99,
    description: "Total price of the order",
    nullable: true,
  })
  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  total_price: number;

  @ApiProperty({
    example: "2023-12-25T10:00:00Z",
    description: "Scheduled date and time for the service",
    nullable: true,
  })
  @Column("timestamp", { nullable: true })
  scheduled_at: Date;

  @ApiProperty({
    example: "2023-12-20T08:30:00Z",
    description: "When the order was created",
    nullable: true,
  })
  @Column("timestamp", { nullable: true })
  created_at: Date;

  @ApiProperty({
    type: () => [OrderProduct],
    description: "List of products included in this order",
  })
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  @ApiProperty({
    type: () => [Payment],
    description: "Payments made for this order",
  })
  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
