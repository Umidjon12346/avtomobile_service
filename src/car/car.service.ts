import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Car } from "./entities/car.entity";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepo: Repository<Car>
  ) {}

  async create(createCarDto: CreateCarDto) {
    const newCar = this.carRepo.create(createCarDto);
    return await this.carRepo.save(newCar);
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
