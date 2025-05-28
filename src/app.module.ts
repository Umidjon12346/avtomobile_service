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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
