import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({ example: "Mirzo Ulug'bek", description: "Hudud nomi" })
  @IsString({ message: "Hudud nomi matn bo'lishi kerak" })
  @IsNotEmpty({ message: "Hudud nomi bo'sh bo'lishi mumkin emas" })
  name: string;

  @ApiProperty({ example: 1, description: "Shahar (City) ID si" })
  @IsInt({ message: "Shahar ID butun son bo'lishi kerak" })
  cityId: number;
}
