import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("notifications")
export class Notification {
  @ApiProperty({ example: 1, description: "Notification ID raqami" })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "Sizga yangi xabar keldi",
    description: "Xabar matni",
  })
  @Column("text")
  message: string;

  @ApiProperty({
    example: false,
    description: "Notification o'qilgan yoki yo'qligi",
  })
  @Column({ default: false })
  is_read: boolean;

  @ApiProperty({
    example: "2025-05-28T12:00:00Z",
    description: "Notification yuborilgan vaqt",
  })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sent_at: Date;

  @ApiProperty({
    type: () => User,
    description: "Notification egasi bo‘lgan foydalanuvchi",
  })
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
  user: User;
}
