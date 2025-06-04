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
import { AuthGuard } from "../common/guards/auth.guard";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { IsUserGuard } from "../common/guards/is.user.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { Request } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { IsAdminGuard } from "../common/guards/is.admin.guard";

const CardOwnershipGuard = ModelOwnershipGuardFactory(Card, "id", ["user"]);
@ApiTags("Cards")
@ApiBearerAuth("JWT-auth") // Agar JWT bilan himoyalangan bo‘lsa
@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get("my-cards")
  @UseGuards(AuthGuard, IsUserGuard) // ModelOwnershipGuard olib tashlandi!
  @ApiOperation({ summary: "Foydalanuvchiga tegishli barcha kartalarni olish" })
  @ApiResponse({ status: 200, description: "Kartalar ro‘yxati", type: [Card] })
  async findAllForUser(@Req() req) {
    const userId = req.user.id;
    return this.cardService.findAllByUserId(userId);
  }

  @Post()
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi karta qo‘shish" })
  @ApiResponse({
    status: 201,
    description: "Karta muvaffaqiyatli yaratildi",
    type: Card,
  })
  create(@Body() createCardDto: CreateCardDto, @Req() req) {
    return this.cardService.create(createCardDto, req.user.id);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha kartalarni olish" })
  @ApiResponse({ status: 200, description: "Kartalar ro‘yxati", type: [Card] })
  findAll() {
    return this.cardService.findAll();
  }

  @Get(":id")
  @UseGuards(CardOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha karta olish" })
  @ApiResponse({ status: 200, description: "Topilgan karta", type: Card })
  @ApiResponse({ status: 404, description: "Karta topilmadi" })
  findOne(@Param("id") id: string) {
    return this.cardService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(CardOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Karta maʼlumotlarini yangilash" })
  @ApiResponse({ status: 200, description: "Karta yangilandi", type: Card })
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @Delete(":id")
  @UseGuards(CardOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Karta o‘chirish" })
  @ApiResponse({ status: 200, description: "Karta o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.cardService.remove(+id);
  }
}
