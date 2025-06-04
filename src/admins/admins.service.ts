import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"


@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password } = createAdminDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.adminRepo.save({
      ...createAdminDto,
      hashed_password,
    });
    return newUser;
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOneBy({ id });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const user = await this.adminRepo.preload({ id, ...updateAdminDto });

    if (!user) {
      throw new NotFoundException("topilmadi");
    }

    return this.adminRepo.save(user);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.adminRepo.update(id, {
      hashed_refresh_token,
    });
  }

  async remove(id: number) {
    await this.adminRepo.delete(id);
    return id;
  }
  
  async updatePassword(
    id: number,
    dto: { oldpassword: string; newpassword: string }
  ): Promise<string> {
    const admin = await this.adminRepo.findOne({ where: { id } });

    if (!admin) throw new NotFoundException("Foydalanuvchi topilmadi");
    const isMatch = await bcrypt.compare(
      dto.oldpassword,
      admin!.hashed_password
    );
    if (!isMatch) throw new BadRequestException("Eski parol noto'g'ri");

    const hashedNewPassword = await bcrypt.hash(dto.newpassword, 7);
    admin!.hashed_password = hashedNewPassword;

    await this.adminRepo.save(admin!);

    return "Parol muvaffaqiyatli yangilandi";
  }
}
