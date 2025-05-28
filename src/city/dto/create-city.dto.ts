import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateCityDto {
  @ApiProperty({ example: "Tashkent", description: "Shahar nomi" })
  @IsString({ message: "Shahar nomi matn ko'rinishida bo'lishi kerak" })
  @IsNotEmpty({ message: "Shahar nomi bo'sh bo'lishi mumkin emas" })
  name: string;
}
