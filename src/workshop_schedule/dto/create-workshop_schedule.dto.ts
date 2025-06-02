import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, Matches } from "class-validator";

export class CreateWorkshopScheduleDto {
  @ApiProperty({ example: "09:00", description: "Opening time (HH:MM)" })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format. Use HH:MM",
  })
  start_time: string;

  @ApiProperty({ example: "18:00", description: "Closing time (HH:MM)" })
  @IsString()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Invalid time format. Use HH:MM",
  })
  close_time: string;

  @ApiProperty({ example: true, description: "Is workshop open?" })
  @IsBoolean()
  is_open: boolean;

  @ApiProperty({
    example: "Monday",
    description: "Day of week",
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  })
  @IsString()
  day: string;

  @ApiProperty({ example: 1, description: "Workshop ID" })
  workshopId: number;
}
