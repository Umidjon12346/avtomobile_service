import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    example: "Oil Change",
    description: "Name of the service",
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: "Complete engine oil replacement with filter change",
    description: "Detailed description of the service",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 49.99,
    description: "Price of the service",
    type: "number",
    format: "float",
    required: true,
  })
  @IsNumber()
  price: number;
}
