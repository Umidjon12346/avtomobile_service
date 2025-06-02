import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Workshop } from "../../workshop/entities/workshop.entity";

@Entity()
export class WorkshopSchedule {
  @ApiProperty({
    example: 1,
    description: "Auto-generated primary key",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "09:00",
    description: "Opening time of the workshop in HH:MM format",
  })
  @Column()
  start_time: string;

  @ApiProperty({
    example: "18:00",
    description: "Closing time of the workshop in HH:MM format",
  })
  @Column()
  close_time: string;

  @ApiProperty({
    type: () => Workshop,
    description: "The workshop this schedule belongs to",
  })
  @ManyToOne(() => Workshop, (workshop) => workshop.schedules)
  workshop: Workshop;

  @ApiProperty({
    example: true,
    description: "Whether the workshop is open on this day",
    default: true,
  })
  @Column({default:true})
  is_open: boolean;

  @ApiProperty({
    example: "Monday",
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
  })
  @Column()
  day: string;
}
