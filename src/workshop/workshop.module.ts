import { Module } from '@nestjs/common';
import { WorkshopServices } from './workshop.service';
import { WorkshopController } from './workshop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from './entities/workshop.entity';
import { WorkshopService } from '../workshop_service/entities/workshop_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop,WorkshopService])],
  controllers: [WorkshopController],
  providers: [WorkshopServices],
  exports: [WorkshopServices, TypeOrmModule.forFeature([Workshop])],
})
export class WorkshopModule {}
