import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create(createOrderDto);
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ["orderProducts","user"], // Agar `orderProducts` bog‘lanmagan bo‘lsa, olib tashlang
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ["orderProducts"], // Bog‘langan jadval kerak bo‘lsa
    });

    if (!order) {
      throw new NotFoundException(`Order ID ${id} topilmadi`);
    }

    return order;
  }

  async findAllByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } }, // user relation orqali id bo'yicha filter
      relations: ["user"], // agar user relationni yuklamoqchi bo‘lsangiz
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
    });

    if (!order) {
      throw new NotFoundException(`Order ID ${id} topilmadi`);
    }

    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<{ message: string }> {
    const order = await this.orderRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException(`Order ID ${id} topilmadi`);
    }

    await this.orderRepository.remove(order);
    return { message: `Order ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
