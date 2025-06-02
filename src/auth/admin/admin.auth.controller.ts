import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { AuthAdminService } from "./admin.auth.service";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCookieAuth,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiParam,
} from "@nestjs/swagger";

@ApiTags("Admin Authentication") // Group endpoints in Swagger UI
@Controller("auth/admin")
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Admin sign in" })
  @ApiBody({ type: SignInDto, description: "Admin credentials" })
  @ApiResponse({
    status: 200,
    description:
      "Successfully signed in. Returns access token in response and sets refresh token in cookies.",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid credentials",
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request - Validation error",
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signIn(signInDto, res);
  }

  @Post("refresh")
  @ApiOperation({ summary: "Refresh admin access token" })
  @ApiResponse({
    status: 200,
    description:
      "Successfully refreshed tokens. Returns new access token in response and sets new refresh token in cookies.",
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized - Invalid or expired refresh token",
  })
  @ApiCookieAuth("admin_refresh_token") // Document that this endpoint requires refresh token cookie
  async adminRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.adminRefreshToken(req, res);
  }

  @Post("sign-out")
  @ApiOperation({ summary: "Admin sign out" })
  @ApiResponse({
    status: 200,
    description: "Successfully signed out. Clears refresh token cookie.",
  })
  @ApiCookieAuth("admin_refresh_token") // Document that this endpoint requires refresh token cookie
  async signOut(
    @CookieGetter("admin_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signOut(refresh_token, res);
  }
}
