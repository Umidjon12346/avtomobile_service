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
import { CityService } from "./city.service";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { City } from "./entities/city.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("city")
@ApiBearerAuth()
@Controller("city")
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post("/")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create a new city" })
  @ApiBody({ type: CreateCityDto })
  @ApiResponse({
    status: 201,
    description: "City successfully created",
    type: City,
  })
  create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all cities" })
  @ApiResponse({ status: 200, description: "List of cities", type: [City] })
  findAll() {
    return this.cityService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get city by ID" })
  @ApiParam({ name: "id", type: Number, description: "City ID" })
  @ApiResponse({ status: 200, description: "City found", type: City })
  @ApiResponse({ status: 404, description: "City not found" })
  findOne(@Param("id") id: string) {
    return this.cityService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a city by ID" })
  @ApiParam({ name: "id", type: Number, description: "City ID" })
  @ApiBody({ type: UpdateCityDto })
  @ApiResponse({
    status: 200,
    description: "City successfully updated",
    type: City,
  })
  @ApiResponse({ status: 404, description: "City not found" })
  update(@Param("id") id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(+id, updateCityDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a city by ID" })
  @ApiParam({ name: "id", type: Number, description: "City ID" })
  @ApiResponse({
    status: 200,
    description: "City successfully deleted",
    type: City,
  })
  @ApiResponse({ status: 404, description: "City not found" })
  remove(@Param("id") id: string) {
    return this.cityService.remove(+id);
  }
}
