import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async sendVerificationEmail(
    email: string, userId: string,orderId:number
    ) {
      const code = uuidv4();
    try {
      await this.emailQueue.add('send_email', { email, code });
      this.logger.log(`Verification email queued for: ${email}`);
      
      await this.emailQueue.add(
        'check_activation',
        { email, userId ,orderId},
        { delay: 5*60*1000 },
      );
      this.logger.log(`Activation check queued for: ${email}`);
    } catch (error) {
      this.logger.error(`Failed to queue email for: ${email}`, error.stack);
    }
  }
}
