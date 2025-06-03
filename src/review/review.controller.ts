import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
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
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { IsUserGuard } from "../common/guards/is.user.guard";

const ReviewOwnershipGuard = ModelOwnershipGuardFactory(Review, "id", ["user"]);

@ApiTags("Review")
@ApiBearerAuth()
@Controller("review")
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi review yaratish" })
  @ApiResponse({ status: 201, description: "Review yaratildi.", type: Review })
  create(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    return this.reviewService.create(createReviewDto, req.user.id);
  }

  @Post("admin")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi review yaratish" })
  @ApiResponse({ status: 201, description: "Review yaratildi.", type: Review })
  create1(@Body() createReviewDto: CreateReviewDto, @Req() req) {
    return this.reviewService.create(createReviewDto, req.user.id);
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
  @UseGuards(ReviewOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Reviewni yangilash" })
  @ApiResponse({ status: 200, description: "Review yangilandi", type: Review })
  update(@Param("id") id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Reviewni o‘chirish" })
  @ApiResponse({ status: 200, description: "Review o‘chirildi", type: Review })
  remove(@Param("id") id: string) {
    return this.reviewService.remove(+id);
  }
}
