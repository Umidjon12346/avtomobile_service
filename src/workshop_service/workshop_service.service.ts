import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WorkshopService } from "./entities/workshop_service.entity";
import { CreateWorkshopServiceDto } from "./dto/create-workshop_service.dto";
import { UpdateWorkshopServiceDto } from "./dto/update-workshop_service.dto";
import { Workshop } from "../workshop/entities/workshop.entity";
import { Service } from "../service/entities/service.entity";

@Injectable()
export class WorkshopServiceService {
  constructor(
    @InjectRepository(WorkshopService)
    private readonly workshopServiceRepo: Repository<WorkshopService>,

    @InjectRepository(Workshop)
    private readonly workshopRepo: Repository<Workshop>,

    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>
  ) {}

  async create(createDto: CreateWorkshopServiceDto) {
    const workshop = await this.workshopRepo.findOneBy({
      id: createDto.workshopId,
    });
    const service = await this.serviceRepo.findOneBy({
      id: createDto.serviceId,
    });

    if (!workshop || !service) {
      throw new NotFoundException("Workshop or Service not found");
    }

    const newWorkshopService = this.workshopServiceRepo.create({
      workshop,
      service,
    });

    return await this.workshopServiceRepo.save(newWorkshopService);
  }

  async findAll() {
    return await this.workshopServiceRepo.find({
      relations: ["workshop", "service"],
    });
  }

  async findOne(id: number) {
    const item = await this.workshopServiceRepo.findOne({
      where: { id },
      relations: ["workshop", "service"],
    });

    if (!item) {
      throw new NotFoundException(`WorkshopService with ID ${id} not found`);
    }

    return item;
  }

  async update(id: number, updateDto: UpdateWorkshopServiceDto) {
    const item = await this.workshopServiceRepo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`WorkshopService with ID ${id} not found`);
    }

    if (updateDto.workshopId) {
      const workshop = await this.workshopRepo.findOneBy({
        id: updateDto.workshopId,
      });
      if (!workshop) throw new NotFoundException("Workshop not found");
      item.workshop = workshop;
    }

    if (updateDto.serviceId) {
      const service = await this.serviceRepo.findOneBy({
        id: updateDto.serviceId,
      });
      if (!service) throw new NotFoundException("Service not found");
      item.service = service;
    }

    return await this.workshopServiceRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.workshopServiceRepo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`WorkshopService with ID ${id} not found`);
    }

    return await this.workshopServiceRepo.remove(item);
  }
}
