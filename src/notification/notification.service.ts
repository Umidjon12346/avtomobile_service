import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepo.create(createNotificationDto);
    return await this.notificationRepo.save(notification);
  }

  async findAll() {
    return await this.notificationRepo.find({
      relations: ["user"],
    });
  }

  async findOne(id: number) {
    const notification = await this.notificationRepo.findOne({
      where: { id },
      relations: ["user"], 
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepo.preload({
      id,
      ...updateNotificationDto,
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return await this.notificationRepo.save(notification);
  }

  async remove(id: number) {
    const notification = await this.notificationRepo.findOneBy({ id });
    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return await this.notificationRepo.remove(notification);
  }
}
