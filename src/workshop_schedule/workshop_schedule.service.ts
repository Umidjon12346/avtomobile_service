import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWorkshopScheduleDto } from "./dto/create-workshop_schedule.dto";
import { UpdateWorkshopScheduleDto } from "./dto/update-workshop_schedule.dto";
import { WorkshopSchedule } from "./entities/workshop_schedule.entity";

@Injectable()
export class WorkshopScheduleService {
  constructor(
    @InjectRepository(WorkshopSchedule)
    private readonly workshopScheduleRepository: Repository<WorkshopSchedule>
  ) {}

  async create(
    createWorkshopScheduleDto: CreateWorkshopScheduleDto
  ): Promise<WorkshopSchedule> {
    const schedule = this.workshopScheduleRepository.create(
      createWorkshopScheduleDto
    );
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
