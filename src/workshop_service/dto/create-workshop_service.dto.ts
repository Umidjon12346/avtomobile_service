import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateWorkshopServiceDto {
  @ApiProperty({ example: 1, description: "Workshop ID" })
  @IsNumber({}, { message: "Workshop ID must be a number" })
  @Min(1, { message: "Workshop ID must be a positive number" })
  @IsNotEmpty({ message: "Workshop ID is required" })
  workshopId: number;

  @ApiProperty({ example: 2, description: "Service ID" })
  @IsNumber({}, { message: "Service ID must be a number" })
  @Min(1, { message: "Service ID must be a positive number" })
  @IsNotEmpty({ message: "Service ID is required" })
  serviceId: number;
}
