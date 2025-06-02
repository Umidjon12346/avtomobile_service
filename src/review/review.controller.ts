import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { Review } from "./entities/review.entity";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Review")
@ApiBearerAuth()
@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi review yaratish" })
  @ApiResponse({ status: 201, description: "Review yaratildi.", type: Review })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha reviewlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha reviewlar ro‘yxati",
    type: [Review],
  })
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Reviewni ID orqali olish" })
  @ApiResponse({ status: 200, description: "Review topildi", type: Review })
  findOne(@Param("id") id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Reviewni yangilash" })
  @ApiResponse({ status: 200, description: "Review yangilandi", type: Review })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Reviewni o‘chirish" })
  @ApiResponse({ status: 200, description: "Review o‘chirildi", type: Review })
  remove(@Param("id") id: string) {
    return this.reviewService.remove(+id);
  }
}
