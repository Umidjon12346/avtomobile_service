import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./entities/service.entity";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepo.create(createServiceDto);
    return await this.serviceRepo.save(newService);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepo.find();
  }

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepo.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(
    id: number,
    updateServiceDto: UpdateServiceDto
  ): Promise<Service> {
    const service = await this.serviceRepo.preload({
      id,
      ...updateServiceDto,
    });
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return await this.serviceRepo.save(service);
  }

  async remove(id: number): Promise<Service> {
    const service = await this.findOne(id);
    return await this.serviceRepo.remove(service);
  }

  //=============================================================================================
  async getMonthlyServiceRevenue() {
    return this.serviceRepo
      .createQueryBuilder("s")
      .select([
        "s.id AS service_id",
        "s.name AS service_name",
        "COUNT(o.id) AS order_count",
        "SUM(s.price) AS total_revenue",
        "AVG(s.price) AS avg_price",
        "EXTRACT(MONTH FROM o.created_at) AS month",
      ])
      .innerJoin("s.orders", "o")
      .where(
        "EXTRACT(YEAR FROM o.created_at) = EXTRACT(YEAR FROM CURRENT_DATE)"
      )
      .andWhere("s.is_active = :isActive", { isActive: true })
      .groupBy("s.id, s.name, EXTRACT(MONTH FROM o.created_at)")
      .orderBy("month")
      .addOrderBy("total_revenue", "DESC")
      .getRawMany();
  }
}
