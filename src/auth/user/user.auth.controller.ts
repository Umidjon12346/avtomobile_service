import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import { AuthUserService } from "./user.auth.service";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateUserDto } from "../../users/dto/create-user.dto";

@ApiTags("User Authentication") // Group all auth endpoints together
@Controller("auth/user")
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post("sign-up")
  @ApiOperation({
    summary: "Bemorni ro'yxatdan o'tkazish",
    description: "Yangi bemor hisobi yaratish uchun ishlatiladi",
  })
  @ApiBody({ type: CreateUserDto, description: "Bemor ma'lumotlari" })
  @ApiResponse({
    status: 201,
    description: "Bemor muvaffaqiyatli ro'yxatdan o'tdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Noto'g'ri so'rov yoki validatsiya xatosi",
  })
  @ApiResponse({
    status: 409,
    description: "Bunday email yoki telefon raqam bilan foydalanuvchi mavjud",
  })
  async signUp(@Body() createPatientDto: CreateUserDto) {
    return this.authUserService.signUp(createPatientDto);
  }

  @Post("sign-in")
  @ApiOperation({
    summary: "Foydalanuvchi tizimga kirishi",
    description: "Login va parol orqali tizimga kirish",
  })
  @ApiBody({ type: SignInDto, description: "Kirish ma'lumotlari" })
  @ApiResponse({
    status: 200,
    description:
      "Muvaffaqiyatli kirish. Access token qaytariladi va refresh token cookie-ga saqlanadi",
  })
  @ApiResponse({
    status: 401,
    description: "Noto'g'ri login yoki parol",
  })
  @ApiResponse({
    status: 400,
    description: "Validatsiya xatosi",
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authUserService.signIn(signInDto, res);
  }

  @Post("refresh")
  @ApiOperation({
    summary: "Access token yangilash",
    description: "Refresh token yordamida yangi access token olish",
  })
  @ApiCookieAuth("refresh_token")
  @ApiResponse({
    status: 200,
    description:
      "Token muvaffaqiyatli yangilandi. Yangi access token qaytariladi",
  })
  @ApiResponse({
    status: 401,
    description: "Yaroqsiz yoki muddati o'tgan refresh token",
  })
  async userRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authUserService.refreshToken(req, res);
  }

  @Post("sign-out")
  @ApiOperation({
    summary: "Tizimdan chiqish",
    description: "Foydalanuvchi sessiyasini tugatish",
  })
  @ApiCookieAuth("refresh_token")
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli chiqish. Refresh token cookie o'chiriladi",
  })
  @ApiResponse({
    status: 401,
    description: "Avtorizatsiyadan o'tmagan foydalanuvchi",
  })
  async signOut(
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authUserService.signOut(refresh_token, res);
  }
}
