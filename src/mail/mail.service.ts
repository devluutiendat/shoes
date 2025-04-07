import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  private async sendMail(
    user: IUser,
    subject: string,
    template: string,
  ): Promise<void> {
    try {
      const code = uuidv4();
      await this.mailerService.sendMail({
        to: user.email,
        subject,
        template: join(process.cwd(), 'src', 'mail', 'template', template),
        context: {
          name: user.name,
          id: user.id,
          code,
        },
      });
      this.logger.log(`email sent to ${user.email} with subject: ${subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${user.email}`, error.stack);
    }
  }

  async sendUserConfirmation(user: IUser): Promise<void> {
    await this.sendMail(
      user,
      'Hãy xác nhận đơn hàng của bạn',
      'confirmation.ejs',
    );
  }

  async sendExpiredConfirmation(user: IUser): Promise<void> {
    await this.sendMail(user, 'Đơn hàng của bạn đã hết hạn', 'expired.ejs');
  }
}
