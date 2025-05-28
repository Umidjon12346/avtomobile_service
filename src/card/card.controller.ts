import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Card } from "./entities/card.entity";

@ApiTags("Cards")
@ApiBearerAuth() // Agar JWT bilan himoyalangan bo‘lsa
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  @ApiOperation({ summary: "Yangi karta qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Karta muvaffaqiyatli yaratildi",
    type: Card,
  })
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha kartalarni olish" })
  @ApiResponse({ status: 200, description: "Kartalar ro‘yxati", type: [Card] })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha karta olish" })
  @ApiResponse({ status: 200, description: "Topilgan karta", type: Card })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  findOne(@Param("id") id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Karta maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Karta yangilandi", type: Card })
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Karta o‘chirish" })
  @ApiResponse({ status: 200, description: "Karta o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}
