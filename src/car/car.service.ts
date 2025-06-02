import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Car } from "./entities/car.entity";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) {}

  async create(createCarDto: CreateCarDto, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const car = this.carRepo.create({ ...createCarDto, user });
    return await this.carRepo.save(car);
  }

  async findAll() {
    return await this.carRepo.find({ relations: ["user"] });
  }

  async findOne(id: number) {
    const car = await this.carRepo.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async findAllByUserId(userId: number): Promise<Car[]> {
      return this.carRepo.find({
        where: { user: { id: userId } }, // user relation orqali id bo'yicha filter
        relations: ["user"], // agar user relationni yuklamoqchi bo‘lsangiz
      });
    }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carRepo.preload({
      id,
      ...updateCarDto,
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return await this.carRepo.save(car);
  }

  async remove(id: number) {
    const car = await this.carRepo.findOneBy({ id });
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }
    await this.carRepo.remove(car);
    return id;
  }
}
