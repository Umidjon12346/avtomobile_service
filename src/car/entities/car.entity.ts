import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("cars")
export class Car {
  @ApiProperty({ example: 1, description: "Avtomobil ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Chevrolet",
    description: "Avtomobil brendi (markasi)",
  })
  @Column()
  brand: string;

  @ApiProperty({ example: "Malibu", description: "Avtomobil modeli" })
  @Column()
  model: string;

  @ApiProperty({
    example: "01A123BC",
    description: "Avtomobil davlat raqami (unikal)",
  })
  @Column({ name: "car_number", unique: true })
  carNumber: string;

  @ApiProperty({
    type: () => User,
    description: "Ushbu avtomobil bog‘langan foydalanuvchi",
  })
  @ManyToOne(() => User, (user) => user.cars, { onDelete: "CASCADE" })
  user: User;
}
