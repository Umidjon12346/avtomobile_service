import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchi to'liq ismi",
  })
  @IsString({ message: "To'liq ism matn bo'lishi kerak" })
  @IsNotEmpty({ message: "To'liq ism kiritilishi shart" })
  full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefoni",
  })
  @IsString({ message: "Telefon raqam matn ko'rinishida bo'lishi kerak" })
  @Matches(/^\+998\d{9}$/, {
    message: "Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak",
  })
  phone: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Foydalanuvchi email manzili",
  })
  @IsEmail({}, { message: "Email manzili noto'g'ri" })
  email: string;

  @ApiProperty({ example: "Password123!", description: "Foydalanuvchi paroli" })
  @IsString({ message: "Parol matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Parol kiritilishi shart" })
  password: string;
}
