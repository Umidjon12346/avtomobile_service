import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMechanicDto } from "./dto/create-mechanic.dto";
import { UpdateMechanicDto } from "./dto/update-mechanic.dto";
import { Mechanic } from "./entities/mechanic.entity";
import { Workshop } from "../workshop/entities/workshop.entity";

@Injectable()
export class MechanicService {
  constructor(
    @InjectRepository(Mechanic)
    private readonly mechanicRepository: Repository<Mechanic>,
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>
  ) {}

  async create(createMechanicDto: CreateMechanicDto): Promise<Mechanic> {
    const { workshop } = createMechanicDto;

    // Avval ustaxona mavjudligini tekshir
    const workshop1 = await this.workshopRepository.findOne({
      where: { id: typeof workshop === 'object' ? workshop.id : workshop },
    });
    if (!workshop1) {
      throw new NotFoundException(`Ustaxona topilmadi (id: ${workshop})`);
    }

    const mechanic = this.mechanicRepository.create(createMechanicDto);
    return await this.mechanicRepository.save(mechanic);
  }

  async findAll(): Promise<Mechanic[]> {
    return await this.mechanicRepository.find();
  }

  async findOne(id: number): Promise<Mechanic> {
    const mechanic = await this.mechanicRepository.findOneBy({ id });
    if (!mechanic) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }
    return mechanic;
  }

  async update(
    id: number,
    updateMechanicDto: UpdateMechanicDto
  ): Promise<Mechanic> {
    const mechanic = await this.mechanicRepository.preload({
      id,
      ...updateMechanicDto,
    });
    if (!mechanic) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }
    return this.mechanicRepository.save(mechanic);
  }

  async remove(id: number): Promise<{ message: string }> {
    const mechanic = await this.mechanicRepository.findOneBy({ id });
    if (!mechanic) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }
    await this.mechanicRepository.remove(mechanic);
    return { message: `Mechanic with ID ${id} deleted` };
  }
}
