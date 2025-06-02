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
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { ModelOwnershipGuardFactory } from "../common/guards/self.guard";
import { Notification } from "./entities/notification.entity";
import { IsUserGuard } from "../common/guards/is.user.guard";

const NotificationOwnershipGuard = ModelOwnershipGuardFactory(Notification, "id", ["user"]);

@ApiTags("Notifications")
@ApiBearerAuth()
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get("my-noti")
    @UseGuards(AuthGuard, IsUserGuard) // ModelOwnershipGuard olib tashlandi!
    @ApiOperation({ summary: "Foydalanuvchiga tegishli barcha kartalarni olish" })
    @ApiResponse({ status: 200, description: "Kartalar ro‘yxati", type: [Notification] })
    async findAllForUser(@Req() req) {
      const userId = req.user.id;
      return this.notificationService.findAllByUserId(userId);
    }

  @Post()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Yangi notification yaratish" })
  @ApiResponse({
    status: 201,
    description: "Notification muvaffaqiyatli yaratildi",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Barcha notificationlarni olish" })
  @ApiResponse({ status: 200, description: "Notificationlar ro‘yxati" })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  @UseGuards(NotificationOwnershipGuard)
  @UseGuards(IsUserGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "ID bo‘yicha notification olish" })
  @ApiResponse({ status: 200, description: "Notification topildi" })
  @ApiResponse({ status: 404, description: "Notification topilmadi" })
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Notificationni yangilash" })
  @ApiResponse({ status: 200, description: "Notification yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Notificationni o‘chirish" })
  @ApiResponse({ status: 200, description: "Notification o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.notificationService.remove(+id);
  }
}
