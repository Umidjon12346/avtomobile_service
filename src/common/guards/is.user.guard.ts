import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class IsUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user || req.user.is_admin) {
      throw new ForbiddenException({
        message: "Faqat Foydalanuvchilar uchun ruxsat berilgan",
      });
    }

    return true;
  }
}
