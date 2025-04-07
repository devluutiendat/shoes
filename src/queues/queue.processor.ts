import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable, Logger } from '@nestjs/common';
import { OrderService } from 'src/orders/order.service';
import { MailService } from 'src/mail/mail.service';

@Processor('emailQueue')
@Injectable()
export class QueueProcessor {
  private readonly logger = new Logger(QueueProcessor.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly emailService: MailService,
  ) {}

  @Process('send_email')
  async handleSendEmail(job: Job) {
    const { email } = job.data;
    try {
      this.logger.log(`Sending verification email to: ${email}`);
      await this.emailService.sendUserConfirmation(job.data);
    } catch (error) {
      this.logger.error(`Failed to send verification email to: ${email}`, error.stack);
    }
  }

  @Process('check_activation')
  async handleCheckActivation(job: Job) {
    const { email , orderId} = job.data;
    try {
      const order = await this.orderService.getOrderById(orderId);

      if (order.active === false) {
        await this.emailService.sendExpiredConfirmation(job.data);
        await this.orderService.remove(orderId);
      }
    } catch (error) {
      this.logger.error(`Failed to check activation for: ${email}`, error.stack);
    }
  }
}
