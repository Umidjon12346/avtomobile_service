import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, Matches } from "class-validator";

export class UpdateWorkshopScheduleDto {
  @ApiProperty({
    example: "10:00",
    description: "Opening time in HH:MM format",
    required: false,
  })
  @IsString({
    message:
      "Start time must be a string | Boshlanish vaqti matn ko'rinishida bo'lishi kerak",
  })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:MM) | Noto'g'ri vaqt formati (HH:MM)",
  })
  @IsOptional()
  start_time?: string;

  @ApiProperty({
    example: "19:00",
    description: "Closing time in HH:MM format",
    required: false,
  })
  @IsString({
    message:
      "Close time must be a string | Tugash vaqti matn ko'rinishida bo'lishi kerak",
  })
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format (HH:MM) | Noto'g'ri vaqt formati (HH:MM)",
  })
  @IsOptional()
  close_time?: string;

  @ApiProperty({
    example: false,
    description: "Whether the workshop is open",
    required: false,
  })
  @IsBoolean({
    message:
      "is_open must be a boolean | is_open mantiqiy qiymat bo'lishi kerak",
  })
  @IsOptional()
  is_open?: boolean;

  @ApiProperty({
    example: "Tuesday",
    description: "Day of the week",
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: false,
  })
  @IsString({
    message: "Day must be a string | Kun matn ko'rinishida bo'lishi kerak",
  })
  @IsOptional()
  day?: string;
}
