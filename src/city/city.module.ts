import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityService } from "./city.service";
import { City } from "./entities/city.entity";
import { CityController } from "./city.controller";

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers:[CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
