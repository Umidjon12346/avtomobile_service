import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";
import { User } from "../../users/entities/user.entity";

export class CreateNotificationDto {
  @ApiProperty({
    example: "Sizga yangi xabar keldi",
    description: "Xabar matni",
  })
  @IsString({ message: "Xabar matni matn bo‘lishi kerak" })
  @IsNotEmpty({ message: "Xabar matni bo‘sh bo‘lishi mumkin emas" })
  message: string;

  @ApiProperty({ example: 7, description: "Foydalanuvchi ID raqami" })
  @IsNumber({}, { message: "Foydalanuvchi ID raqam bo‘lishi kerak" })
  @IsNotEmpty({ message: "Foydalanuvchi ID majburiy" })
  user: User;
}
