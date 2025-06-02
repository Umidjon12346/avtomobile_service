import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Workshop } from "../../workshop/entities/workshop.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Review {
  @ApiProperty({
    example: 1,
    description: "Auto-generated primary key",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => User,
    description: "User who created the review",
  })
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ApiProperty({
    type: () => Workshop,
    description: "Workshop being reviewed",
  })
  @ManyToOne(() => Workshop, (workshop) => workshop.reviews)
  workshop: Workshop;

  @ApiProperty({
    example: 5,
    description: "Rating from 1 to 5",
    minimum: 1,
    maximum: 5,
    nullable: true,
  })
  @Column({ type: "int", nullable: true })
  rating: number;

  @ApiProperty({
    example: "Great service! Highly recommended.",
    description: "Review comment",
    nullable: true,
  })
  @Column({ type: "text", nullable: true })
  comment: string;

  @ApiProperty({
    example: "2023-05-20T12:00:00.000Z",
    description: "Timestamp when review was created",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;
}
