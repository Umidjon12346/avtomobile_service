import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsDateString,
  IsDecimal,
  IsBoolean,
  IsString,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  IsIn,
  Min,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { OrderProduct } from "../../order_product/entities/order_product.entity";

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: "User ID placing the order" })
  @IsNumber(
    {},
    {
      message: "Foydalanuvchi ID raqam boʻlishi kerak",
    }
  )
  @IsNotEmpty({
    message: "Foydalanuvchi ID kiritilishi shart",
  })
  user_id: number;

  @ApiPropertyOptional({
    example: 1,
    description: "Mechanic ID assigned to the order",
  })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: "Mexanik ID raqam boʻlishi kerak",
    }
  )
  mechanic_id?: number;

  @ApiProperty({ example: 1, description: "Service ID for the order" })
  @IsNumber(
    {},
    {
      message: "Xizmat ID raqam boʻlishi kerak",
    }
  )
  @IsNotEmpty({
    message: "Xizmat ID kiritilishi shart",
  })
  service_id: number;

  @ApiPropertyOptional({
    example: "pending",
    description: "Initial status of the order",
    enum: ["pending", "confirmed", "in_progress"],
  })
  @IsOptional()
  @IsIn(["pending", "confirmed", "in_progress"], {
    message:
      "Status quyidagilardan biri boʻlishi kerak: pending, confirmed, in_progress",
  })
  status?: string;

  @ApiPropertyOptional({
    example: "2023-12-25T10:00:00Z",
    description: "Scheduled date and time",
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: "Sana toʻgʻri formatda kiritilishi kerak",
    }
  )
  scheduled_at?: Date;

  @ApiProperty({
    type: [OrderProduct],
    description: "List of products in the order",
  })
  @IsArray({
    message: "Mahsulotlar roʻyxat koʻrinishida kiritilishi kerak",
  })
  @ValidateNested({ each: true })
  @Type(() => OrderProduct)
  orderProducts: OrderProduct[];
}
