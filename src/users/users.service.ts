import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailService: MailService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password } = createUserDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.userRepo.save({
      ...createUserDto,
      hashed_password,
    });

    try {
      console.log("Sending email to:", newUser.email);
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.error("SendMail error:", error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return newUser;
  }

  findAll() {
    return this.userRepo.find({ relations: ["cars", "cards"] });
  }

  async findOne(id: number) {
    const admin = await this.userRepo.findOne({
      where: { id },
      relations: ["cars", "cards"],
    });

    if (!admin) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return admin;
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async findUserByRefresh(refresh_token: string) {
    const students = await this.userRepo.find();

    for (const student of students) {
      const match = await bcrypt.compare(
        refresh_token,
        student.hashed_refresh_token
      );
      if (match) return student;
    }

    return null;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.preload({ id, ...updateUserDto });

    if (!user) {
      throw new NotFoundException("topilmadi");
    }

    return this.userRepo.save(user);
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.userRepo.update(id, {
      hashed_refresh_token,
    });
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return id;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link topilmadi");
    }

    // Foydalanuvchini topamiz
    const user = await this.userRepo.findOne({
      where: {
        activation_link: link,
        is_active: false,
      },
    });

    if (!user) {
      throw new BadRequestException(
        "Foydalanuvchi allaqachon faollashtirilgan yoki noto'g'ri link"
      );
    }

    // Foydalanuvchini yangilaymiz
    user.is_active = true;
    await this.userRepo.save(user);

    return {
      message: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      is_active: user.is_active,
    };
  }
}
