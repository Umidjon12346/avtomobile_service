import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

@Entity()
export class Payment {
  @ApiProperty({
    example: 1,
    description: "Auto-generated payment ID",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => Order,
    description: "The order associated with this payment",
  })
  @ManyToOne(() => Order, (order) => order.payments)
  order: Order;

  @ApiProperty({
    example: 99.99,
    description: "Payment amount in decimal format",
    type: Number,
  })
  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @ApiPropertyOptional({
    example: "credit_card",
    description: "Payment method used",
    enum: ["credit_card", "cash", "bank_transfer", "paypal", "other"],
    nullable: true,
  })
  @Column("varchar", { length: 50, nullable: true })
  payment_type: string;

  @ApiPropertyOptional({
    example: "2023-12-25T14:30:00Z",
    description: "Timestamp when payment was completed",
    nullable: true,
  })
  @Column("timestamp", { nullable: true })
  paid_at: Date;

  @ApiPropertyOptional({
    example: "completed",
    description: "Current payment status",
    enum: ["pending", "processing", "completed", "failed", "refunded"],
    nullable: true,
  })
  @Column("varchar", { length: 50, nullable: true })
  status: string;
}
