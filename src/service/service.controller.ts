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
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Services")
@ApiBearerAuth("JWT-auth") // Agar authentication kerak bo‘lsa
@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi service yaratish" })
  @ApiResponse({ status: 201, description: "Service yaratildi" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha servicelarni olish" })
  @ApiResponse({ status: 200, description: "Servicelar ro‘yxati" })
  findAll() {
    return this.serviceService.findAll();
  }
  @Get("stats")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  stats() {
    return this.serviceService.getMonthlyServiceRevenue();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID orqali service topish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Service topildi" })
  findOne(@Param("id") id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Service yangilash" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Service yangilandi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Service o‘chirish" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Service o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.serviceService.remove(+id);
  }
}
