import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("card")
export class Card {
  @ApiProperty({ example: 1, description: "Karta ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "UzCard", description: "Karta nomi" })
  @Column()
  name: string;

  @ApiProperty({ example: "8600123456789012", description: "Karta raqami" })
  @Column()
  number: string;

  @ApiProperty({
    example: "2025-12-31",
    description: "Karta amal qilish muddati (sanasi)",
  })
  @Column()
  date: Date;

  @ApiProperty({
    type: () => User,
    description: "Karta egasi bo‘lgan foydalanuvchi",
  })
  @ManyToOne(() => User, (user) => user.cards, { onDelete: "CASCADE" })
  user: User;
}
