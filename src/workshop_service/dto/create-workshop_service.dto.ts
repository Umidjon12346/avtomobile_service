import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { Service } from "../../service/entities/service.entity";

export class CreateWorkshopServiceDto {
  @ApiProperty({ example: 1, description: "Workshop ID" })
  @IsNumber({}, { message: "Workshop ID must be a number" })
  @Min(1, { message: "Workshop ID must be a positive number" })
  @IsNotEmpty({ message: "Workshop ID is required" })
  workshop_id: number;

  @ApiProperty({ example: 2, description: "Service ID" })
  @IsNumber({}, { message: "Service ID must be a number" })
  @Min(1, { message: "Service ID must be a positive number" })
  @IsNotEmpty({ message: "Service ID is required" })
  service_id: number;
}
