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
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { Payment } from "./entities/payment.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Payment")
@ApiBearerAuth("JWT-auth") // Swagger guruh nomi
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "To‘lovni yaratish" })
  @ApiResponse({ status: 201, description: "To‘lov yaratildi", type: Payment })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha to‘lovlarni olish" })
  @ApiResponse({
    status: 200,
    description: "To‘lovlar ro‘yxati",
    type: [Payment],
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha to‘lovni olish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "To‘lov topildi", type: Payment })
  findOne(@Param("id") id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "To‘lovni yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "To‘lov yangilandi", type: Payment })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "To‘lovni o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "To‘lov o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.paymentService.remove(+id);
  }
}
