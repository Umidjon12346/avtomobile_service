import { Module } from '@nestjs/common';
import { AdminsModule } from '../admins/admins.module';
import { AuthAdminController } from './admin/admin.auth.controller';
import { AuthAdminService } from './admin/admin.auth.service';

import { UsersModule } from '../users/users.module';
import { AuthUserController } from './user/user.auth.controller';
import { AuthUserService } from './user/user.auth.service';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[JwtModule.register({ global: true }),AdminsModule,UsersModule],
  controllers: [AuthAdminController,AuthUserController],
  providers: [AuthAdminService,AuthUserService],
})
export class AuthModule {}
