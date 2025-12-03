import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async sendVerificationEmail(
    email: string,
    userId: string,
    orderIds: number[],
    name: string,
   ) {
    try {
      // Send verification email
      await this.emailQueue.add('send_email', { userId, email, name});
      this.logger.log(`Verification email queued for: ${email}`);

      // Queue expiry check after 5 minutes
      await this.emailQueue.add(
        'check_activation',
        {  userId, email, name, orderIds}, 
        { delay: 5 * 60 * 1000 },
      );
      this.logger.log(`Activation check queued for: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to queue email for: ${email}`, error.stack);
    }
  }
}
