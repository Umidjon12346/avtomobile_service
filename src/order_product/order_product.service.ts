import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderProduct } from "./entities/order_product.entity";
import { CreateOrderProductDto } from "./dto/create-order_product.dto";
import { UpdateOrderProductDto } from "./dto/update-order_product.dto";
import { Order } from "../order/entities/order.entity";
import { Product } from "../product/entities/product.entity";

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(dto: CreateOrderProductDto): Promise<OrderProduct> {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });
    if (!order)
      throw new NotFoundException(`Order ID ${dto.orderId} topilmadi`);

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product)
      throw new NotFoundException(`Product ID ${dto.productId} topilmadi`);

    const orderProduct = this.orderProductRepository.create({
      order,
      product,
      unit_price: dto.unit_price,
      quantity: dto.quantity,
    });

    return await this.orderProductRepository.save(orderProduct);
  }

  async findAll(): Promise<OrderProduct[]> {
    return await this.orderProductRepository.find({
      relations: ["order", "product"],
    });
  }

  async findOne(id: number): Promise<OrderProduct> {
    const orderProduct = await this.orderProductRepository.findOne({
      where: { id },
      relations: ["order", "product"],
    });

    if (!orderProduct) {
      throw new NotFoundException(`OrderProduct ID ${id} topilmadi`);
    }

    return orderProduct;
  }

  async update(id: number, dto: UpdateOrderProductDto): Promise<OrderProduct> {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new NotFoundException(`OrderProduct ID ${id} topilmadi`);
    }

    if (dto.orderId) {
      const order = await this.orderRepository.findOneBy({ id: dto.orderId });
      if (!order)
        throw new NotFoundException(`Order ID ${dto.orderId} topilmadi`);
      orderProduct.order = order;
    }

    if (dto.productId) {
      const product = await this.productRepository.findOneBy({
        id: dto.productId,
      });
      if (!product)
        throw new NotFoundException(`Product ID ${dto.productId} topilmadi`);
      orderProduct.product = product;
    }

    if (dto.unit_price !== undefined) orderProduct.unit_price = dto.unit_price;
    if (dto.quantity !== undefined) orderProduct.quantity = dto.quantity;

    return await this.orderProductRepository.save(orderProduct);
  }

  async remove(id: number): Promise<{ message: string }> {
    const orderProduct = await this.orderProductRepository.findOneBy({ id });
    if (!orderProduct) {
      throw new NotFoundException(`OrderProduct ID ${id} topilmadi`);
    }

    await this.orderProductRepository.remove(orderProduct);
    return { message: `OrderProduct ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
