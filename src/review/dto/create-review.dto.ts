import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min, Max } from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: 3,
    description: "Workshop ID",
    required: true,
  })
  @IsNumber(
    {},
    {
      message:
        "Workshop ID raqam bo'lishi kerak | Workshop ID must be a number",
    }
  )
  workshopId: number;

  @ApiProperty({
    example: 5,
    description: "Rating from 1 to 5",
    minimum: 1,
    maximum: 5,
    required: false,
  })
  @IsNumber(
    {},
    {
      message: "Reyting raqam bo'lishi kerak | Rating must be a number",
    }
  )
  @Min(1, {
    message:
      "Reyting 1 dan kam bo'lmasligi kerak | Rating cannot be less than 1",
  })
  @Max(5, {
    message:
      "Reyting 5 dan ko'p bo'lmasligi kerak | Rating cannot be more than 5",
  })
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: "Great service!",
    description: "Review comment",
    required: false,
  })
  @IsString({
    message: "Izoh matn ko'rinishida bo'lishi kerak | Comment must be a string",
  })
  @IsOptional()
  comment?: string;
}
