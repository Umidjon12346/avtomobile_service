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
import { WorkshopService } from "./workshop.service";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";
import { UpdateWorkshopDto } from "./dto/update-workshop.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";


@ApiTags("Workshop")
@ApiBearerAuth()
@Controller("workshop")
export class WorkshopController {
  constructor(private readonly workshopService: WorkshopService) {}

  @Post()
  @ApiOperation({ summary: "Create new workshop" })
  @ApiResponse({ status: 201, description: "Workshop successfully created" })
  create(@Body() createWorkshopDto: CreateWorkshopDto) {
    return this.workshopService.create(createWorkshopDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all workshops" })
  @ApiResponse({ status: 200, description: "List of all workshops" })
  findAll() {
    return this.workshopService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop found" })
  @ApiResponse({ status: 404, description: "Workshop not found" })
  findOne(@Param("id") id: string) {
    return this.workshopService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop successfully updated" })
  update(
    @Param("id") id: string,
    @Body() updateWorkshopDto: UpdateWorkshopDto
  ) {
    return this.workshopService.update(+id, updateWorkshopDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a workshop by ID" })
  @ApiResponse({ status: 200, description: "Workshop successfully deleted" })
  remove(@Param("id") id: string) {
    return this.workshopService.remove(+id);
  }
}
