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
import { NotificationService } from "./notification.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";


@ApiTags("Notifications")
@ApiBearerAuth() // Swagger UI'da token so‘rash uchun
@Controller("notification")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: "Yangi notification yaratish" })
  @ApiResponse({
    status: 201,
    description: "Notification muvaffaqiyatli yaratildi",
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha notificationlarni olish" })
  @ApiResponse({ status: 200, description: "Notificationlar ro‘yxati" })
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha notification olish" })
  @ApiResponse({ status: 200, description: "Notification topildi" })
  @ApiResponse({ status: 404, description: "Notification topilmadi" })
  findOne(@Param("id") id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Notificationni yangilash" })
  @ApiResponse({ status: 200, description: "Notification yangilandi" })
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Notificationni o‘chirish" })
  @ApiResponse({ status: 200, description: "Notification o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.notificationService.remove(+id);
  }
}
