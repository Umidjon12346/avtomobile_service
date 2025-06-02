import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { IsUserGuard } from "../common/guards/is.user.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { User } from "./entities/user.entity";


const UserOwnershipGuard = ModelOwnershipGuardFactory(User, "id", ["id"]);

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi foydalanuvchi yaratish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli yaratildi",
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha foydalanuvchilar ro‘yxatini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchilar ro‘yxati" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @UseGuards(UserOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha foydalanuvchini olish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi topildi" })
  @ApiResponse({ status: 404, description: "Foydalanuvchi topilmadi" })
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(UserOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Foydalanuvchini yangilash" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi yangilandi" })
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Foydalanuvchini o‘chirish" })
  @ApiResponse({ status: 200, description: "Foydalanuvchi o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.usersService.activateUser(link);
  }
}
