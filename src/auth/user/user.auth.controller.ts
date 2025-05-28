import { Body, Controller, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import { AuthUserService } from "./user.auth.service";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";


@Controller("auth/user")
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authUserService.signIn(signInDto, res);
  }

  @Post("refresh")
  async userRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authUserService.refreshToken(req, res);
  }

  @Post("sign-out")
    async signOut(
      @CookieGetter("refresh_token") refresh_token: string,
      @Res({ passthrough: true }) res: Response
    ) {
      return this.authUserService.signOut(refresh_token, res);
    }
}

