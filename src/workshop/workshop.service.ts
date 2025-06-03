import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Workshop } from "./entities/workshop.entity";
import { CreateWorkshopDto } from "./dto/create-workshop.dto";
import { UpdateWorkshopDto } from "./dto/update-workshop.dto";

@Injectable()
export class WorkshopServices {
  constructor(
    @InjectRepository(Workshop)
    private readonly workshopRepo: Repository<Workshop>,
    @InjectDataSource() private dataSource: DataSource
  ) {}

  async create(createWorkshopDto: CreateWorkshopDto) {
    const workshop = this.workshopRepo.create(createWorkshopDto);
    return await this.workshopRepo.save(workshop);
  }

  async findAll() {
    return await this.workshopRepo.find({
      relations: ["region"],
    });
  }

  async findOne(id: number) {
    const workshop = await this.workshopRepo.findOne({
      where: { id },
      relations: ["region"],
    });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return workshop;
  }

  async update(id: number, updateWorkshopDto: UpdateWorkshopDto) {
    const workshop = await this.workshopRepo.preload({
      id,
      ...updateWorkshopDto,
    });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return await this.workshopRepo.save(workshop);
  }

  async remove(id: number) {
    const workshop = await this.workshopRepo.findOneBy({ id });

    if (!workshop) {
      throw new NotFoundException(`Workshop with ID ${id} not found`);
    }

    return await this.workshopRepo.remove(workshop);
  }

  ///==================================================================================================
  async getWorkshopStats(): Promise<any[]> {
    const query = `
      SELECT 
        w.id AS workshop_id,
        w.name AS workshop_name,
        COUNT(DISTINCT ws."serviceId") AS total_services,
        COUNT(DISTINCT m.id) AS total_mechanics
      FROM workshop w
      LEFT JOIN workshop_service ws ON ws."workshopId" = w.id
      LEFT JOIN mechanic m ON m."workshopId" = w.id
      GROUP BY w.id
      ORDER BY total_mechanics DESC;
    `;

    return await this.dataSource.query(query);
  }

  async getTopWorkshops() {
    const sql = `
      SELECT 
        w.id AS workshop_id,
        w.name AS workshop_name,
        ROUND(AVG(r.rating), 2) AS average_rating,
        COUNT(r.id) AS total_reviews
      FROM workshop w
      LEFT JOIN review r ON r."workshopId" = w.id
      GROUP BY w.id
      ORDER BY average_rating DESC
      LIMIT 10;
    `;

    const results = await this.dataSource.query(sql);

    // Natijani kerakli formatga keltirish
    return results.map((row) => ({
      workshop_id: Number(row.workshop_id),
      workshop_name: row.workshop_name,
      average_rating:
        row.average_rating !== null ? parseFloat(row.average_rating) : null,
      total_reviews: Number(row.total_reviews),
    }));
  }
}

