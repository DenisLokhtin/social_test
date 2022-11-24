import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/entity/profile.entity';
import { SubscriptionEntity } from '@app/entity/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, SubscriptionEntity])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
