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
import { WorkshopScheduleService } from "./workshop_schedule.service";
import { CreateWorkshopScheduleDto } from "./dto/create-workshop_schedule.dto";
import { UpdateWorkshopScheduleDto } from "./dto/update-workshop_schedule.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { WorkshopSchedule } from "./entities/workshop_schedule.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Workshop Schedule")
@ApiBearerAuth("JWT-auth")
@Controller("workshop-schedule")
export class WorkshopScheduleController {
  constructor(
    private readonly workshopScheduleService: WorkshopScheduleService
  ) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi Workshop jadvalini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Workshop jadvali yaratildi",
    type: WorkshopSchedule,
  })
  create(@Body() createWorkshopScheduleDto: CreateWorkshopScheduleDto) {
    return this.workshopScheduleService.create(createWorkshopScheduleDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha Workshop jadvallarini olish" })
  @ApiResponse({
    status: 200,
    description: "Workshop jadvallari ro‘yxati",
    type: [WorkshopSchedule],
  })
  findAll() {
    return this.workshopScheduleService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha Workshop jadvalini olish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Workshop jadvali topildi",
    type: WorkshopSchedule,
  })
  findOne(@Param("id") id: string) {
    return this.workshopScheduleService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Workshop jadvalini yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Workshop jadvali yangilandi",
    type: WorkshopSchedule,
  })
  update(
    @Param("id") id: string,
    @Body() updateWorkshopScheduleDto: UpdateWorkshopScheduleDto
  ) {
    return this.workshopScheduleService.update(+id, updateWorkshopScheduleDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Workshop jadvalini o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Workshop jadvali o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.workshopScheduleService.remove(+id);
  }
}
