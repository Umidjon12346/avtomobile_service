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

class OrderProductDto {
  @ApiProperty({ example: 1, description: "Product ID" })
  @IsNumber(
    {},
    {
      message: "Mahsulot ID raqam boʻlishi kerak",
    }
  )
  @IsNotEmpty({
    message: "Mahsulot ID kiritilishi shart",
  })
  product_id: number;

  @ApiProperty({ example: 2, description: "Quantity of the product" })
  @IsNumber(
    {},
    {
      message: "Miqdor raqam boʻlishi kerak",
    }
  )
  @Min(1, {
    message: "Miqdor kamida 1 boʻlishi kerak",
  })
  @Max(100, {
    message: "Miqdor 100 dan oshmasligi kerak",
  })
  quantity: number;

  @ApiProperty({ example: 49.99, description: "Unit price at time of order" })
  @IsDecimal(
    {},
    {
      message: "Narx decimal son boʻlishi kerak",
    }
  )
  @Min(0.01, {
    message: "Narx kamida 0.01 boʻlishi kerak",
  })
  unit_price: number;
}

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
    type: [OrderProductDto],
    description: "List of products in the order",
  })
  @IsArray({
    message: "Mahsulotlar roʻyxat koʻrinishida kiritilishi kerak",
  })
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];
}
