import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsDateString, IsNumber } from "class-validator";

export class CreateCardDto {
  @ApiProperty({ example: "UzCard", description: "Karta nomi" })
  @IsString({ message: "Karta nomi matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Karta nomi majburiy" })
  name: string;

  @ApiProperty({ example: "8600123456789012", description: "Karta raqami" })
  @IsString({ message: "Karta raqami faqat matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Karta raqami bo‘sh bo‘lishi mumkin emas" })
  number: string;

  @ApiProperty({
    example: "12/31",
    description: "Karta amal qilish muddati (sana)",
  })
  @IsDateString(
    {},
    { message: "Sana noto‘g‘ri formatda. To‘g‘ri format: " }
  )
  @IsNotEmpty({ message: "Karta amal qilish muddati majburiy" })
  date: string;

  @ApiProperty({ example: 7, description: "Foydalanuvchi ID raqami" })
  @IsNumber({}, { message: "Foydalanuvchi ID raqami raqam bo‘lishi kerak" })
  @IsNotEmpty({ message: "Foydalanuvchi ID raqami talab qilinadi" })
  userId: number;
}
