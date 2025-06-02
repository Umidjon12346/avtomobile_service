import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Generated } from "typeorm";
import { Notification } from "../../notification/entities/notification.entity";
import { Car } from "../../car/entities/car.entity";
import { Card } from "../../card/entities/card.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Review } from "../../review/entities/review.entity";
import { Order } from "../../order/entities/order.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @ApiProperty({ example: 1, description: "Foydalanuvchi ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchi to'liq ismi",
  })
  @Column()
  full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefoni",
    uniqueItems: true,
  })
  @Column({ unique: true })
  phone: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchi email manzili",
    uniqueItems: true,
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: "Parolning hash ko'rinishi" })
  @Column("text")
  hashed_password: string;

  @ApiProperty({
    description: "Refresh token hash",
    nullable: true,
    required: false,
  })
  @Column({ nullable: true })
  hashed_refresh_token: string;

  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi aktivligi (0 yoki 1)",
  })
  @Column({ default: false })
  is_active: boolean;

  @Column({ nullable: true })
  @Generated("uuid")
  activation_link: string;

  @ApiProperty({
    type: () => [Notification],
    description: "Foydalanuvchining notificationlari",
    required: false,
  })
  @OneToMany(() => Notification, (n) => n.user)
  notifications: Notification[];

  @ApiProperty({
    type: () => [Car],
    description: "Foydalanuvchining avtomobillari",
    required: false,
  })
  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];

  @ApiProperty({
    type: () => [Card],
    description: "Foydalanuvchining kartalari",
    required: false,
  })
  @OneToMany(() => Card, (card) => card.user)
  cards: Card[];

  @ApiProperty({
    type: () => [Review],
    description: "Foydalanuvchining Komentlari",
    required: false,
  })
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
