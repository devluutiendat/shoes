import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { IUser } from './interfaces/user.interface';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-confirmation')
  async sendConfirmation(@Body() user: IUser) {
    await this.mailService.sendUserConfirmation(user);
    return { message: 'Confirmation email sent successfully' };
  }

  @Post('send-expired')
  async sendExpired(@Body() user: IUser) {
    await this.mailService.sendExpiredConfirmation(user);
    return { message: 'Expired email sent successfully' };
  }
}