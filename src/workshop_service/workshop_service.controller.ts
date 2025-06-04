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
import { WorkshopServiceService } from "./workshop_service.service";
import { CreateWorkshopServiceDto } from "./dto/create-workshop_service.dto";
import { UpdateWorkshopServiceDto } from "./dto/update-workshop_service.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Workshop Services")
@ApiBearerAuth("JWT-auth") // Agar JWT authentication ishlatilsa
@Controller("workshop-service")
export class WorkshopServiceController {
  constructor(
    private readonly workshopServiceService: WorkshopServiceService
  ) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi workshop service yaratish" })
  @ApiResponse({ status: 201, description: "Workshop service yaratildi" })
  @ApiResponse({ status: 400, description: "Xatolik yuz berdi" })
  create(@Body() createWorkshopServiceDto: CreateWorkshopServiceDto) {
    return this.workshopServiceService.create(createWorkshopServiceDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha workshop servicelarni olish" })
  @ApiResponse({ status: 200, description: "Ro‘yxat muvaffaqiyatli olindi" })
  findAll() {
    return this.workshopServiceService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID orqali workshop service olish" })
  @ApiParam({ name: "id", type: Number, description: "Workshop service ID" })
  @ApiResponse({ status: 200, description: "Topildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  findOne(@Param("id") id: string) {
    return this.workshopServiceService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Workshop service yangilash" })
  @ApiParam({ name: "id", type: Number, description: "Workshop service ID" })
  @ApiResponse({ status: 200, description: "Yangilandi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  update(
    @Param("id") id: string,
    @Body() updateWorkshopServiceDto: UpdateWorkshopServiceDto
  ) {
    return this.workshopServiceService.update(+id, updateWorkshopServiceDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Workshop service o‘chirish" })
  @ApiParam({ name: "id", type: Number, description: "Workshop service ID" })
  @ApiResponse({ status: 200, description: "O‘chirildi" })
  @ApiResponse({ status: 404, description: "Topilmadi" })
  remove(@Param("id") id: string) {
    return this.workshopServiceService.remove(+id);
  }
}
