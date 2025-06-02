import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "bemor@example.com",
    description: "Foydalanuvchi elektron pochta manzili",
    required: true,
    format: "email",
  })
  email: string;

  @ApiProperty({
    example: "StrongPassword123!",
    description:
      "Foydalanuvchi paroli (kamida 8 belgi, 1 katta harf, 1 raqam, 1 maxsus belgi)",
    required: true,
  })
  password: string;
}
