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
import { OrderProductService } from "./order_product.service";
import { CreateOrderProductDto } from "./dto/create-order_product.dto";
import { UpdateOrderProductDto } from "./dto/update-order_product.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { OrderProduct } from "./entities/order_product.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("OrderProduct") // Swagger tag
@ApiBearerAuth()
@Controller("order-product")
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi OrderProduct yaratish" })
  @ApiResponse({
    status: 201,
    description: "Yangi OrderProduct yaratildi",
    type: OrderProduct,
  })
  create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductService.create(createOrderProductDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha OrderProductlarni olish" })
  @ApiResponse({
    status: 200,
    description: "OrderProductlar ro‘yxati",
    type: [OrderProduct],
  })
  findAll() {
    return this.orderProductService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID orqali OrderProductni olish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "OrderProduct topildi",
    type: OrderProduct,
  })
  findOne(@Param("id") id: string) {
    return this.orderProductService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "OrderProductni yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "OrderProduct yangilandi",
    type: OrderProduct,
  })
  update(
    @Param("id") id: string,
    @Body() updateOrderProductDto: UpdateOrderProductDto
  ) {
    return this.orderProductService.update(+id, updateOrderProductDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "OrderProductni o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({
    status: 200,
    description: "OrderProduct o‘chirildi",
  })
  remove(@Param("id") id: string) {
    return this.orderProductService.remove(+id);
  }
}
