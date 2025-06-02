// guards/model-ownership.guard.ts
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  Type,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectLiteral, Repository } from "typeorm";

export function ModelOwnershipGuardFactory<T extends ObjectLiteral>(
  entity: Type<T>,
  idField: keyof T = "id" as keyof T,
  ownerFields: (keyof T)[] = ["user" as keyof T]
): Type<CanActivate> {
  @Injectable()
  class ModelOwnershipGuard implements CanActivate {
    constructor(
      @InjectRepository(entity)
      private readonly repository: Repository<T>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();

      if (!req.user || !req.user.id) {
        throw new ForbiddenException("Foydalanuvchi aniqlanmadi");
      }

      const recordId = req.params?.id;
      if (!recordId) {
        throw new ForbiddenException("ID berilmagan");
      }

      const record = await this.repository.findOne({
        where: { [idField]: recordId } as any,
        relations: ownerFields as string[], // ensure relation fields are loaded
      });

      if (!record) {
        throw new ForbiddenException("Ma'lumot topilmadi");
      }

      const isOwner = ownerFields.some((field) => {
        const value = record[field];
        return typeof value === "object" && value?.id
          ? value.id === req.user.id
          : value === req.user.id;
      });

      if (!isOwner) {
        throw new ForbiddenException("Bu resurs sizga tegishli emas");
      }

      req.record = record;
      return true;
    }
  }

  return mixin(ModelOwnershipGuard);
}
