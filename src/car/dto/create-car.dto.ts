import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateCarDto {
  @ApiProperty({
    example: "Chevrolet",
    description: "Avtomobil brendi (markasi)",
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ example: "Malibu", description: "Avtomobil modeli" })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: "01A123BC",
    description: "Avtomobil davlat raqami (unikal)",
  })
  @IsString()
  @IsNotEmpty()
  carNumber: string;

  @ApiProperty({
    example: 5,
    description: "Foydalanuvchi ID raqami (avtomobil egasi)",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
