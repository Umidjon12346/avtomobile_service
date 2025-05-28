import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags("Admins") // Swagger tag
@ApiBearerAuth() // Agar access token bilan himoyalangan bo‘lsa
@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
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
  @ApiOperation({ summary: "Barcha adminlarni olish" })
  @ApiResponse({ status: 200, description: "Adminlar roʻyxati", type: [Admin] })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha adminni olish" })
  @ApiResponse({ status: 200, description: "Topilgan admin", type: Admin })
  @ApiResponse({ status: 404, description: "Admin topilmadi" })
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Admin maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Admin yangilandi", type: Admin })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Adminni o‘chirish" })
  @ApiResponse({ status: 200, description: "Admin o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }
}
