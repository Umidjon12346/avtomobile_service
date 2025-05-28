import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Car } from "./entities/car.entity";

@ApiTags("Cars") // Swaggerda `Cars` deb ko‘rsatadi
@ApiBearerAuth() // JWT token kerak bo‘lsa (token bilan himoyalangan bo‘lsa)
@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: "Yangi avtomobil qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Avtomobil muvaffaqiyatli yaratildi",
    type: Car,
  })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha avtomobillarni olish" })
  @ApiResponse({
    status: 200,
    description: "Avtomobillar roʻyxati",
    type: [Car],
  })
  findAll() {
    return this.carService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha avtomobilni olish" })
  @ApiResponse({ status: 200, description: "Topilgan avtomobil", type: Car })
  @ApiResponse({ status: 404, description: "Avtomobil topilmadi" })
  findOne(@Param("id") id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Avtomobilni yangilash" })
  @ApiResponse({ status: 200, description: "Avtomobil yangilandi", type: Car })
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Avtomobilni o‘chirish" })
  @ApiResponse({ status: 200, description: "Avtomobil o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.carService.remove(+id);
  }
}
