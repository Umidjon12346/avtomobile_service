import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkshopScheduleDto } from "./dto/create-workshop_schedule.dto";
import { UpdateWorkshopScheduleDto } from "./dto/update-workshop_schedule.dto";
import { WorkshopSchedule } from "./entities/workshop_schedule.entity";
import { Workshop } from "../workshop/entities/workshop.entity";

@Injectable()
export class WorkshopScheduleService {
  constructor(
    @InjectRepository(WorkshopSchedule)
    private readonly workshopScheduleRepository: Repository<WorkshopSchedule>,
    @InjectRepository(Workshop)
    private readonly workshopRepository: Repository<Workshop>
  ) {}

  async create(
    createWorkshopScheduleDto: CreateWorkshopScheduleDto
  ): Promise<WorkshopSchedule> {
    // Workshop ID bo'yicha Workshop ni qidiramiz
    const workshop = await this.workshopRepository.findOneBy({
      id: createWorkshopScheduleDto.workshopId,
    });

    if (!workshop) {
      throw new NotFoundException(
        `Workshop with ID ${createWorkshopScheduleDto.workshopId} not found`
      );
    }

    // DTOdagi workshopId ni to'g'ridan-to'g'ri entitiyga o'zgartiramiz
    const schedule = this.workshopScheduleRepository.create({
      ...createWorkshopScheduleDto,
      workshop: workshop, // relation sifatida qo'shamiz
    });

    return await this.workshopScheduleRepository.save(schedule);
  }

  async findAll(): Promise<WorkshopSchedule[]> {
    return await this.workshopScheduleRepository.find();
  }

  async findOne(id: number): Promise<WorkshopSchedule> {
    const schedule = await this.workshopScheduleRepository.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException(`WorkshopSchedule ID ${id} topilmadi`);
    }
    return schedule;
  }

  async update(
    id: number,
    updateWorkshopScheduleDto: UpdateWorkshopScheduleDto
  ): Promise<WorkshopSchedule> {
    const schedule = await this.workshopScheduleRepository.preload({
      id,
      ...updateWorkshopScheduleDto,
    });
    if (!schedule) {
      throw new NotFoundException(`WorkshopSchedule ID ${id} topilmadi`);
    }
    return await this.workshopScheduleRepository.save(schedule);
  }

  async remove(id: number): Promise<{ message: string }> {
    const schedule = await this.workshopScheduleRepository.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException(`WorkshopSchedule ID ${id} topilmadi`);
    }
    await this.workshopScheduleRepository.remove(schedule);
    return { message: `WorkshopSchedule ID ${id} o‘chirildi` };
  }
}
