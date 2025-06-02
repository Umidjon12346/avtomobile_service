import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/entities/user.entity";
import { CreateUserDto } from "../../users/dto/create-user.dto";


@Injectable()
export class AuthUserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: UsersService
  ) {}

  async generateToken(student: User) {
    const payload = {
      id: student.id,
      is_admin:false,
      email: student.email,
      is_active: student.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createPatientDto: CreateUserDto) {
    const candidate = await this.studentService.findByEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("bunday emailli patient bor");
    }

    const newUser = await this.studentService.create(createPatientDto);
    return { message: "Foydalanuvchi qoshildida", newUser };
  }

  async signIn(singInDto: SignInDto, res: Response) {
    const student = await this.studentService.findByEmail(singInDto.email);

    if (!student) {
      throw new BadRequestException("Email yoki password hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      student.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.generateToken(student);
    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      student.hashed_refresh_token = hashed_refresh_token;
      await this.studentService.update(student.id, student);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async signOut(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User uchun emas");
    }

    const hashed_refresh_token = " ";
    await this.studentService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("refresh_token");

    return { message: "Eson-omon chiqib olding User" };
  }

  async refreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const students = await this.studentService.findAll();
    const student = students.find(
      (student) =>
        student.hashed_refresh_token &&
        bcrypt.compareSync(refresh_token, student.hashed_refresh_token)
    );

    if (!student) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.generateToken(student);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    student.hashed_refresh_token = hashed_refresh_token;
    await this.studentService.update(student.id, student);

    res.cookie("refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token o'zgardi User ",
      accessToken: tokens.accessToken,
    };
  }
}