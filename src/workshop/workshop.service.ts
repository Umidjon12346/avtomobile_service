import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Workshop } from "./entities/workshop.entity";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";
import { UpdateWorkshopDto } from "./dto/update-workshop.dto";

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopRepo: Repository<Workshop>
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto) {
    const workshop = this.workshopRepo.create(createWorkshopDto);
    return await this.workshopRepo.save(workshop);
  }

  async findAll() {
    return await this.workshopRepo.find({
      relations: ["workshops_services"], 
    });
  }

  async findOne(id: number) {
    const workshop = await this.workshopRepo.findOne({
      where: { id },
      relations: ["regions"],
    });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return workshop;
  }

  async update(id: number, updateWorkshopDto: UpdateWorkshopDto) {
    const workshop = await this.workshopRepo.preload({
      id,
      ...updateWorkshopDto,
    });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return await this.workshopRepo.save(workshop);
  }

  async remove(id: number) {
    const workshop = await this.workshopRepo.findOneBy({ id });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return await this.workshopRepo.remove(workshop);
  }
}
