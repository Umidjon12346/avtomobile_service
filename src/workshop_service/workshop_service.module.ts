import { Module } from '@nestjs/common';
import { WorkshopServiceService } from './workshop_service.service';
import { WorkshopServiceController } from './workshop_service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkshopService } from './entities/workshop_service.entity';
import { ServiceModule } from '../service/service.module';
import { WorkshopModule } from '../workshop/workshop.module';

@Module({
  imports:[TypeOrmModule.forFeature([WorkshopService]),ServiceModule,WorkshopModule],
  controllers: [WorkshopServiceController],
  providers: [WorkshopServiceService],
})
export class WorkshopServiceModule {}
