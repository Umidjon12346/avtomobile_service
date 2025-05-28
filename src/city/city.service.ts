import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { City } from "./entities/city.entity";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>
  ) {}

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.cityRepo.save(createCityDto);
  }

  async findAll(): Promise<City[]> {
    return await this.cityRepo.find();
  }

  async findOne(id: number): Promise<City> {
    const city = await this.cityRepo.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.cityRepo.preload({ id, ...updateCityDto });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return await this.cityRepo.save(city);
  }

  async remove(id: number): Promise<City> {
    const city = await this.cityRepo.findOneBy({ id });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return await this.cityRepo.remove(city);
  }
}
