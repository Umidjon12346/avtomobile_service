import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "../../order/entities/order.entity";
import { Product } from "../../product/entities/product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class OrderProduct {
  @ApiProperty({ example: 1, description: "OrderProduct ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Order, description: "Buyurtmaga tegishli" })
  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ApiProperty({ type: () => Product, description: "Mahsulotga tegishli" })
  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @ApiProperty({ example: 9.99, description: "Mahsulot bir dona narxi" })
  @Column("decimal", { precision: 10, scale: 2 })
  unit_price: number;

  @ApiProperty({
    example: 3,
    description: "Buyurtma qilingan mahsulotlar soni",
  })
  @Column("int")
  quantity: number;
}
