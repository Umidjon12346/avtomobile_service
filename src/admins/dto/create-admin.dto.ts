import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({ example: "Ali Valiyev", description: "Adminning to'liq ismi" })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "ali@example.com",
    description: "Adminning email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "myStrongPassword123", description: "Admin paroli" })
  @MinLength(6)
  password: string;
}
