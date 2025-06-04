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
import { WorkshopServices } from "./workshop.service";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";
import { UpdateWorkshopDto } from "./dto/update-workshop.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";


@ApiTags("Workshop")
@ApiBearerAuth("JWT-auth")
@Controller("workshop")
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopServices) {}

  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Get("stats")
  @ApiOperation({
    summary: "Har bir workshop bo‘yicha xizmatlar va mexaniklar statistikasi",
  })
  async getWorkshopStats() {
    return this.workshopService.getWorkshopStats();
  }

  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @Get("top")
  async getTopWorkshops() {
    return await this.workshopService.getTopWorkshops();
  }

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create new workshop" })
  @ApiResponse({ status: 201, description: "Workshop successfully created" })
  create(@Body() createWorkshopDto: CreateWorkshopDto) {
    return this.workshopService.create(createWorkshopDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all workshops" })
  @ApiResponse({ status: 200, description: "List of all workshops" })
  findAll() {
    return this.workshopService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop found" })
  @ApiResponse({ status: 404, description: "Workshop not found" })
  findOne(@Param("id") id: string) {
    return this.workshopService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop successfully updated" })
  update(
    @Param("id") id: string,
    @Body() updateWorkshopDto: UpdateWorkshopDto
  ) {
    return this.workshopService.update(+id, updateWorkshopDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop successfully deleted" })
  remove(@Param("id") id: string) {
    return this.workshopService.remove(+id);
  }
}
