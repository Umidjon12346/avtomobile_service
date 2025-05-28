import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity("admins")
export class Admin {
  @ApiProperty({
    example: 1,
    description: "Admin ID raqami (avtomatik yaratiladi)",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Ali Valiyev", description: "Adminning to'liq ismi" })
  @Column()
  full_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Admin email manzili",
  })
  @Column()
  email: string;

  @ApiProperty({
    example: "$2b$10$abc...",
    description: "Hashlangan parol",
    writeOnly: true,
  })
  @Column()
  hashed_password: string;

  @ApiProperty({
    example: false,
    description: "Agar admin yaratuvchi bo‘lsa true bo‘ladi",
  })
  @Column({ default: false })
  is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Admin faol yoki yo‘qligini bildiradi",
  })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({
    example: "$2b$10$refresh...",
    description: "Hashlangan refresh token",
    nullable: true,
    writeOnly: true,
  })
  @Column({ nullable: true })
  hashed_refresh_token: string;
}
