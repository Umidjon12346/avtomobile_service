import { Module } from '@nestjs/common';
import { MechanicService } from './mechanic.service';
import { MechanicController } from './mechanic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mechanic } from './entities/mechanic.entity';
import { Workshop } from '../workshop/entities/workshop.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Mechanic,Workshop])],
  controllers: [MechanicController],
  providers: [MechanicService],
})
export class MechanicModule {}
