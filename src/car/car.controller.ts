import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
import { IsUserGuard } from "../common/guards/is.user.guard";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { Card } from "../card/entities/card.entity";

const CarOwnershipGuard = ModelOwnershipGuardFactory(Car, "id", ["user"]);

@ApiTags("Cars") // Swaggerda `Cars` deb ko‘rsatadi
@ApiBearerAuth("JWT-auth") // JWT token kerak bo‘lsa (token bilan himoyalangan bo‘lsa)
@Controller("car")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get("my-cars")
  @UseGuards(AuthGuard, IsUserGuard)
  @ApiOperation({ summary: "Foydalanuvchiga tegishli barcha Mashina olish" })
  @ApiResponse({ status: 200, description: "Mashina ro‘yxati", type: [Card] })
  async findAllForUser(@Req() req) {
    const userId = req.user.id;
    return this.carService.findAllByUserId(userId);
  }

  @Post()
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi avtomobil qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Avtomobil muvaffaqiyatli yaratildi",
    type: Car,
  })
  async create(@Body() createCarDto: CreateCarDto, @Req() req) {
    return this.carService.create(createCarDto, req.user.id);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
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
  @UseGuards(CarOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha avtomobilni olish" })
  @ApiResponse({ status: 200, description: "Topilgan avtomobil", type: Car })
  @ApiResponse({ status: 404, description: "Avtomobil topilmadi" })
  findOne(@Param("id") id: string) {
    return this.carService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(CarOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Avtomobilni yangilash" })
  @ApiResponse({ status: 200, description: "Avtomobil yangilandi", type: Car })
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(+id, updateCarDto);
  }

  @Delete(":id")
  @UseGuards(CarOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Avtomobilni o‘chirish" })
  @ApiResponse({ status: 200, description: "Avtomobil o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.carService.remove(+id);
  }
}
