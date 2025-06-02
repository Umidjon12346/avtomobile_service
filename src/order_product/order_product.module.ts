import { Module } from '@nestjs/common';
import { OrderProductService } from './order_product.service';
import { OrderProductController } from './order_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderProduct } from './entities/order_product.entity';
import { Order } from '../order/entities/order.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderProduct,Order,Product])],
  controllers: [OrderProductController],
  providers: [OrderProductService],
})
export class OrderProductModule {}
