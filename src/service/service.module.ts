import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { WorkshopService } from '../workshop_service/entities/workshop_service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service,WorkshopService])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService, TypeOrmModule.forFeature([Service])],
})
export class ServiceModule {}
