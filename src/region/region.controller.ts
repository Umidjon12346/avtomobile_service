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
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
// JWT guardingiz joylashuvi

@ApiTags("region")
@ApiBearerAuth("JWT-auth") // Bu dekorator swaggerga "Authorize" tugmasini qo'shadi
@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create a new region" })
  @ApiResponse({ status: 201, description: "Region created successfully." })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all regions" })
  @ApiResponse({ status: 200, description: "List of regions" })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a region by id" })
  @ApiResponse({ status: 200, description: "Region found" })
  findOne(@Param("id") id: string) {
    return this.regionService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a region by id" })
  @ApiResponse({ status: 200, description: "Region updated successfully" })
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a region by id" })
  @ApiResponse({ status: 200, description: "Region deleted successfully" })
  remove(@Param("id") id: string) {
    return this.regionService.remove(+id);
  }
}
