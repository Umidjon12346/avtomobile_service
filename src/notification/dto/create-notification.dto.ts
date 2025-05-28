import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";

export class CreateNotificationDto {
  @ApiProperty({
    example: "Sizga yangi xabar keldi",
    description: "Xabar matni",
  })
  @IsString({ message: "Xabar matni matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Xabar matni bo‘sh bo‘lishi mumkin emas" })
  message: string;

  @ApiProperty({ example: false, description: "Notification o'qilganligi" })
  @IsBoolean({ message: "is_read faqat true yoki false bo‘lishi mumkin" })
  is_read: boolean;

  @ApiProperty({ example: 7, description: "Foydalanuvchi ID raqami" })
  @IsNumber({}, { message: "Foydalanuvchi ID raqam bo‘lishi kerak" })
  @IsNotEmpty({ message: "Foydalanuvchi ID majburiy" })
  user_id: number;
}
