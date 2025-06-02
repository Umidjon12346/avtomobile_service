import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsDecimal,
  IsString,
  IsIn,
  IsNotEmpty,
} from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "Buyurtma IDsi",
  })
  @IsNumber({}, { message: "Buyurtma IDsi raqam bo'lishi kerak" })
  @IsNotEmpty({ message: "Buyurtma IDsi kiritilishi shart" })
  order_id: number;

  @ApiProperty({
    example: 150000,
    description: "To'lov miqdori",
  })
  @IsDecimal({}, { message: "To'lov miqdori butun son bo'lishi kerak" })
  @IsNotEmpty({ message: "To'lov miqdori kiritilishi shart" })
  amount: number;

  @ApiPropertyOptional({
    example: "naqd",
    description: "To'lov turi",
    enum: ["naqd", "karta", "bank", "payme", "click"],
  })
  @IsOptional()
  @IsIn(["naqd", "karta", "bank", "payme", "click"], {
    message:
      "To'lov turi quyidagilardan biri bo'lishi kerak: naqd, karta, bank, payme, click",
  })
  payment_type?: string;

  @ApiPropertyOptional({
    example: "2023-12-25T14:30:00Z",
    description: "To'lov qilingan vaqt",
  })
  @IsOptional()
  paid_at?: Date;

  @ApiPropertyOptional({
    example: "tugallangan",
    description: "To'lov holati",
    enum: [
      "kutilmoqda",
      "jarayonda",
      "tugallangan",
      "muvaffaqiyatsiz",
      "qaytarilgan",
    ],
  })
  @IsOptional()
  @IsIn(
    [
      "kutilmoqda",
      "jarayonda",
      "tugallangan",
      "muvaffaqiyatsiz",
      "qaytarilgan",
    ],
    {
      message:
        "To'lov holati quyidagilardan biri bo'lishi kerak: kutilmoqda, jarayonda, tugallangan, muvaffaqiyatsiz, qaytarilgan",
    }
  )
  status?: string;
}
