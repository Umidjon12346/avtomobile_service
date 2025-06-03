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
import { MechanicService } from "./mechanic.service";
import { CreateMechanicDto } from "./dto/create-mechanic.dto";
import { UpdateMechanicDto } from "./dto/update-mechanic.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Mechanic } from "./entities/mechanic.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Mechanics")
@Controller("mechanic")
export class MechanicController {
  constructor(private readonly mechanicService: MechanicService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi mexanik qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Mexanik yaratildi",
    type: Mechanic,
  })
  create(@Body() createMechanicDto: CreateMechanicDto) {
    return this.mechanicService.create(createMechanicDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha mexaniklarni olish" })
  @ApiResponse({
    status: 200,
    description: "Mexaniklar ro‘yxati",
    type: [Mechanic],
  })
  findAll() {
    return this.mechanicService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha mexanikni olish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Mexanik topildi",
    type: Mechanic,
  })
  findOne(@Param("id") id: string) {
    return this.mechanicService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Mexanikni yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Mexanik yangilandi",
    type: Mechanic,
  })
  update(
    @Param("id") id: string,
    @Body() updateMechanicDto: UpdateMechanicDto
  ) {
    return this.mechanicService.update(+id, updateMechanicDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Mexanikni o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "Mexanik o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.mechanicService.remove(+id);
  }
}
