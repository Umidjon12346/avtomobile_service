import { PartialType } from '@nestjs/swagger';
import { CreateWorkshopServiceDto } from './create-workshop_service.dto';

export class UpdateWorkshopServiceDto extends PartialType(CreateWorkshopServiceDto) {}
