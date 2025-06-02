import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { City } from '../city/entities/city.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Region,City])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
