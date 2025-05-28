import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber } from "class-validator";

export class CreateWorkshopDto {
  @ApiProperty({ example: "Auto Fix Center", description: "Workshop nomi" })
  @IsString({ message: "Nomi matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Workshop nomi bo‘sh bo‘lishi mumkin emas" })
  name: string;

  @ApiProperty({ example: "Chilonzor, 5-kvartal", description: "Manzili" })
  @IsString({ message: "Manzil matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Manzil kiritilishi shart" })
  address: string;

  @ApiProperty({ example: 2, description: "Region ID (bog‘langan region)" })
  @IsNumber({}, { message: "Region ID raqam bo‘lishi kerak" })
  region_id: number;

  @ApiProperty({
    example: "41.2995, 69.2401",
    description: "GPS koordinatalar (location)",
  })
  @IsString({ message: "Lokatsiya matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Lokatsiya kiritilishi shart" })
  location: string;

  @ApiProperty({ example: "+998901234567", description: "Telefon raqami" })
  @IsPhoneNumber("UZ", { message: "Telefon raqami noto‘g‘ri formatda" })
  phone: string;
}
