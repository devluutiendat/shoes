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
<<<<<<< HEAD
      this.logger.error(
        `Failed to send verification email to: ${email}`,
        error.stack,
      );
=======
      this.logger.error(`Failed to send verification email to: ${email}`, error.stack);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }

  @Process('check_activation')
  async handleCheckActivation(job: Job) {
<<<<<<< HEAD
    const { email, orderIds, name, userId } = job.data;

    try {
      for (const orderId of orderIds) {
        const order = await this.orderService.getOrderById(orderId);

        if (!order) continue;

        if (order.active === false) {
          await this.emailService.sendExpiredConfirmation({
            userId,
            email,
            name,
          });
          await this.orderService.remove(orderId);
        }
      }
    } catch (error) {
      this.logger.error(
        `Failed to check activation for: ${email}`,
        error.stack,
      );
=======
    const { email , orderId} = job.data;
    try {
      const order = await this.orderService.getOrderById(orderId);

      if (order.active === false) {
        await this.emailService.sendExpiredConfirmation(job.data);
        await this.orderService.remove(orderId);
      }
    } catch (error) {
      this.logger.error(`Failed to check activation for: ${email}`, error.stack);
>>>>>>> 0b6316ac15dc8cb2d493227cee067b1781790869
    }
  }
}
