import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { user } = createNotificationDto;

    // Foydalanuvchi mavjudligini tekshir
    const user1 = await this.userRepo.findOne({
      where: { id: typeof user === "object" ? user.id : user },
    });
    if (!user1) {
      throw new NotFoundException(`Foydalanuvchi topilmadi (id: ${user})`);
    }

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

  async findAllByUserId(userId: number): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { user: { id: userId } }, // user relation orqali id bo'yicha filter
      relations: ["user"], // agar user relationni yuklamoqchi bo‘lsangiz
    });
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const { user } = updateNotificationDto;

    // Foydalanuvchi mavjudligini tekshir
    const user1 = await this.userRepo.findOne({
      where: { id: typeof user === "object" ? user.id : user },
    });
    if (!user1) {
      throw new NotFoundException(`Foydalanuvchi topilmadi (id: ${user})`);
    }
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
