import { Module } from '@nestjs/common';
import { WorkshopScheduleService } from './workshop_schedule.service';
import { WorkshopScheduleController } from './workshop_schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopSchedule } from './entities/workshop_schedule.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WorkshopSchedule])],
  controllers: [WorkshopScheduleController],
  providers: [WorkshopScheduleService],
})
export class WorkshopScheduleModule {}
