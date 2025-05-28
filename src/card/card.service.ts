import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>
  ) {}

  async create(createCardDto: CreateCardDto) {
    return await this.cardRepo.save(createCardDto);
  }

  async findAll() {
    return await this.cardRepo.find();
  }

  async findOne(id: number) {
    const card = await this.cardRepo.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    const card = await this.cardRepo.preload({ id, ...updateCardDto });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return await this.cardRepo.save(card);
  }

  async remove(id: number) {
    const card = await this.cardRepo.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return await this.cardRepo.remove(card);
  }
}
