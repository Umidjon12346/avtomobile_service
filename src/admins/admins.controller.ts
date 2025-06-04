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
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Admin } from "./entities/admin.entity";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { IsSuperAdminGuard } from "../common/guards/is.super.admin.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { CreateNewPassDto } from "./dto/new.pass.dto";

const AdminOwnershipGuard = ModelOwnershipGuardFactory(Admin, "id", ["id"]);

@ApiTags("Admins") // Swagger tag
@ApiBearerAuth("JWT-auth") // Agar access token bilan himoyalangan bo‘lsa
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @UseGuards(IsSuperAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi admin yaratish" })
  @ApiResponse({
    status: 201,
    description: "Admin muvaffaqiyatli yaratildi",
    type: Admin,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @UseGuards(IsSuperAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar roʻyxati", type: [Admin] })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @UseGuards(AdminOwnershipGuard)
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha adminni olish" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsSuperAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Admin maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @UseGuards(AdminOwnershipGuard)
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Patch(":id/password")
  async updatePassword(
    @Param("id") id: number,
    @Body() dto: CreateNewPassDto
  ): Promise<{ message: string }> {
    const result = await this.adminsService.updatePassword(id, dto);
    return { message: result };
  }

  @Delete(":id")
  @UseGuards(IsSuperAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
