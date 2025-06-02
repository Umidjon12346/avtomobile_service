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
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBasicAuth,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Order } from "./entities/order.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsUserGuard } from "../common/guards/is.user.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";

const OrderOwnershipGuard = ModelOwnershipGuardFactory(Order, "id", ["user"]);

@ApiTags("Order")
@ApiBearerAuth() // Swagger UI'dagi guruh nomi
@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get("my-orders")
  @UseGuards(AuthGuard, IsUserGuard) // ModelOwnershipGuard olib tashlandi!
  @ApiOperation({
    summary: "Foydalanuvchiga tegishli barcha buyurtmalrni olish",
  })
  @ApiResponse({
    status: 200,
    description: "Buyurtmalar ro‘yxati",
    type: [Order],
  })
  async findAllForUser(@Req() req) {
    const userId = req.user.id;
    return this.orderService.findAllByUserId(userId);
  }

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi buyurtma yaratish" })
  @ApiResponse({
    status: 201,
    description: "Buyurtma yaratildi",
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha buyurtmalarni olish" })
  @ApiResponse({
    status: 200,
    description: "Buyurtmalar ro‘yxati",
    type: [Order],
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(":id")
  @UseGuards(OrderOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha buyurtma olish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Buyurtma topildi",
    type: Order,
  })
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Buyurtmani yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Buyurtma yangilandi",
    type: Order,
  })
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Buyurtmani o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "Buyurtma o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.orderService.remove(+id);
  }
}
