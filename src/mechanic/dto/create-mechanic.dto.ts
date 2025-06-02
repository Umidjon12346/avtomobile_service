import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  MaxLength,
  Min,
  Max,
  IsOptional,
} from "class-validator";
import { Workshop } from "../../workshop/entities/workshop.entity";

export class CreateMechanicDto {
  @ApiProperty({
    example: "Aliyev Valijon",
    description: "Mexanikning toʻliq ismi",
  })
  @IsString({ message: "Ism matn koʻrinishida boʻlishi kerak" })
  @IsNotEmpty({ message: "Ism kiritilishi shart" })
  @MaxLength(255, { message: "Ism 255 belgidan oshmasligi kerak" })
  full_name: string;

  @ApiProperty({
    example: 1,
    description: "Ustaxonaning ID raqami",
  })
  @IsNumber({}, { message: "Ustaxona IDsi raqam boʻlishi kerak" })
  @IsNotEmpty({ message: "Ustaxona IDsi kiritilishi shart" })
  workshop: Workshop;

  @ApiPropertyOptional({
    example: 5,
    description: "Tajriba yili (ixtiyoriy)",
  })
  @IsOptional()
  @IsNumber({}, { message: "Tajriba yili raqam boʻlishi kerak" })
  @Min(0, { message: "Tajriba yili manfiy boʻlmasligi kerak" })
  @Max(50, { message: "Tajriba yili 50 yildan oshmasligi kerak" })
  experience?: number;

  @ApiPropertyOptional({
    example: true,
    description: "Mexanik band emasligi (ixtiyoriy)",
  })
  @IsOptional()
  @IsBoolean({
    message: "Band emasligi mantiqiy qiymat boʻlishi kerak (true/false)",
  })
  is_available?: boolean;
}
