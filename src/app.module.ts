import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsModule } from './admins/admins.module';
import { UsersModule } from './users/users.module';
import { CardModule } from './card/card.module';
import { CarModule } from './car/car.module';
import { NotificationModule } from './notification/notification.module';
import { CityModule } from './city/city.module';
import { RegionModule } from './region/region.module';
import { WorkshopModule } from './workshop/workshop.module';
import { AuthModule } from './auth/auth.module';
import { ServiceModule } from './service/service.module';
import { WorkshopServiceModule } from './workshop_service/workshop_service.module';
import { ReviewModule } from './review/review.module';
import { WorkshopScheduleModule } from './workshop_schedule/workshop_schedule.module';
import { ProductModule } from './product/product.module';
import { OrderProductModule } from './order_product/order_product.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { MechanicModule } from './mechanic/mechanic.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AdminsModule,
    UsersModule,
    CardModule,
    CarModule,
    NotificationModule,
    CityModule,
    RegionModule,
    WorkshopModule,
    AuthModule,
    ServiceModule,
    WorkshopServiceModule,
    ReviewModule,
    WorkshopScheduleModule,
    ProductModule,
    OrderProductModule,
    OrderModule,
    PaymentModule,
    MechanicModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
