import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User)
        private readonly userRepo: Repository<User>
  ) {}

  async create(createReviewDto: CreateReviewDto,userId:number): Promise<Review> {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }

    const newCard = this.reviewRepo.create({
      ...createReviewDto,
      user, // userni entity tarzida ulayapmiz
    });
    return await this.reviewRepo.save(newCard);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepo.find();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOneBy({ id });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepo.preload({ id, ...updateReviewDto });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return await this.reviewRepo.save(review);
  }

  async remove(id: number): Promise<Review> {
    const review = await this.findOne(id);
    return await this.reviewRepo.remove(review);
  }
}
