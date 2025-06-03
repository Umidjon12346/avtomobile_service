import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderProduct } from "../../order_product/entities/order_product.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Product {
  @ApiProperty({ example: 1, description: "Mahsulot ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Apple", description: "Mahsulot nomi" })
  @Column("varchar", { length: 255 })
  name: string;

  @ApiProperty({
    example: "Fresh red apple",
    description: "Mahsulot tavsifi",
    required: false,
  })
  @Column("text", { nullable: true })
  description: string;

  @ApiProperty({ example: 1.99, description: "Mahsulot narxi" })
  @Column("decimal", { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: true,
    description: "Mahsulot zaxirada mavjudmi",
    required: false,
  })
  @Column("boolean", { default: true,nullable:true })
  in_stock: boolean;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
