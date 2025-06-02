import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Region } from "./entities/region.entity";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { City } from "../city/entities/city.entity"; // kerakli path bo‘lishi kerak

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,

    @InjectRepository(City)
    private readonly cityRepo: Repository<City>
  ) {}

  async create(createRegionDto: CreateRegionDto): Promise<Region> {
    const { city } = createRegionDto;

    const city1 = await this.cityRepo.findOne({
      where: { id: typeof city === "object" ? city.id : city },
    });
    if (!city1) {
      throw new NotFoundException(`City topilmadi (id: ${city})`);
    }

    const region = this.regionRepo.create(createRegionDto);
    return await this.regionRepo.save(region);
  }

  async findAll(): Promise<Region[]> {
    return await this.regionRepo.find({ relations: ["city"] }); // city bilan birga olish
  }

  async findOne(id: number): Promise<Region> {
    const region = await this.regionRepo.findOne({
      where: { id },
      relations: ["city"],
    });
    if (!region) {
      throw new NotFoundException(`Region topilmadi (id: ${id})`);
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto): Promise<Region> {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Region topilmadi (id: ${id})`);
    }

    if (updateRegionDto.city) {
      const city = await this.cityRepo.findOne({
        where: {
          id:
            typeof updateRegionDto.city === "object"
              ? updateRegionDto.city.id
              : updateRegionDto.city,
        },
      });
      if (!city) {
        throw new NotFoundException(
          `Yangi City topilmadi (id: ${updateRegionDto.city})`
        );
      }
    }

    Object.assign(region, updateRegionDto);
    return await this.regionRepo.save(region);
  }

  async remove(id: number): Promise<{ message: string }> {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new NotFoundException(`Region topilmadi (id: ${id})`);
    }

    await this.regionRepo.remove(region);
    return { message: `Region o‘chirildi (id: ${id})` };
  }
}
