import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
  Patch,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { AuthGuard } from "../common/guards/auth.guard";
import { UpdateProductDto } from "./dto/update-product.dto";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

@ApiTags("Products")
@ApiBearerAuth()
@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi mahsulot yaratish" })
  @ApiResponse({
    status: 201,
    description: "Mahsulot yaratildi",
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha mahsulotlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Mahsulotlar ro‘yxati",
    type: [Product],
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID orqali mahsulotni olish" })
  @ApiResponse({ status: 200, description: "Topilgan mahsulot", type: Product })
  findOne(@Param("id") id: number) {
    return this.productService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Mahsulotni yangilash" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "To‘lov yangilandi", type: Product })
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdateProductDto) {
    return this.productService.update(+id, updatePaymentDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Mahsulot o‘chirish" })
  @ApiParam({ name: "id", example: 1 })
  @ApiResponse({ status: 200, description: "To‘lov o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
