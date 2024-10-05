import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { emailTemplates } from 'src/common/constants/mailOptions';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationCode(
    to: string,
    code: string,
    action: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'anvil.supply@gmail.com',
      to,
      subject:
        action === 'register'
          ? emailTemplates.signup.subject
          : emailTemplates.resetPassword.subject,
      html:
        action === 'register'
          ? emailTemplates.signup.html(code.split('.')[0])
          : emailTemplates.resetPassword.html(code.split('.')[0]),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
