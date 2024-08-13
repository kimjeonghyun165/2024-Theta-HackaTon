import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor(
    ) {
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

    async sendVerificationCode(to: string, code: string): Promise<void> {

        const mailOptions = {
            from: 'googoo.nft@gmail.com',
            to,
            subject: 'Email Verification',
            html: `<p>Your verification code is: <strong>${code.split('.')[0]}</strong></p>`,
        };

        await this.transporter.sendMail(mailOptions);
    }
}
