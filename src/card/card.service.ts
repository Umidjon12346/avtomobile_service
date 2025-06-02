import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Card } from "./entities/card.entity";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createCardDto: CreateCardDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const newCard = this.cardRepo.create({
      ...createCardDto,
      user, // userni entity tarzida ulayapmiz
    });

    return await this.cardRepo.save(newCard);
  }

  async findAll() {
    return await this.cardRepo.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const card = await this.cardRepo.findOneBy({ id });
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findAllByUserId(userId: number): Promise<Card[]> {
    return this.cardRepo.find({
      where: { user: { id: userId } }, // user relation orqali id bo'yicha filter
      relations: ["user"], // agar user relationni yuklamoqchi bo‘lsangiz
    });
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
