import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(patient: User) {
    const url = `${process.env.API_URL}/api/users/activate/${patient.activation_link}`;
    console.log(url);
    console.log(patient.email);

    await this.mailerService.sendMail({
      to: patient.email,
      subject: "Welcome to app",
      html: `<h1>Hello! Dear ${patient.full_name}</h1>
             <h2>Please click below to confirmation</h2>
             <p><a href="${url}">Confirm</a></p>`,
    });
    
  }
}
