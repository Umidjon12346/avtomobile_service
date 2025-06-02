import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsNumber, Min, IsNotEmpty } from "class-validator";

export class CreateOrderProductDto {
  @ApiProperty({ example: 1, description: "Buyurtma ID raqami" })
  @IsInt({ message: "orderId butun son bo‘lishi kerak" })
  @IsPositive({ message: "orderId musbat bo‘lishi kerak" })
  orderId: number;

  @ApiProperty({ example: 2, description: "Mahsulot ID raqami" })
  @IsInt({ message: "productId butun son bo‘lishi kerak" })
  @IsPositive({ message: "productId musbat bo‘lishi kerak" })
  productId: number;

  @ApiProperty({ example: 9.99, description: "Bir dona mahsulot narxi" })
  @IsNumber({}, { message: "unit_price raqam bo‘lishi kerak" })
  @Min(0.01, { message: "unit_price 0.01 dan katta bo‘lishi kerak" })
  unit_price: number;

  @ApiProperty({ example: 3, description: "Mahsulot miqdori" })
  @IsInt({ message: "quantity butun son bo‘lishi kerak" })
  @Min(1, { message: "quantity kamida 1 bo‘lishi kerak" })
  quantity: number;
}
