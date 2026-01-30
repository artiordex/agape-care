import { QUEUE_NAMES } from '@agape-care/api-contract';
import { DatabaseModule } from '@agape-care/database';

import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUE_NAMES.EMAIL,
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.SMS,
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.NOTIFICATION,
    }),
    DatabaseModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
