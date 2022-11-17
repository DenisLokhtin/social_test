import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@app/entity/post.entity';
import { ProfileEntity } from '@app/entity/profile.entity';
import { SubscriptionEntity } from '@app/entity/subscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, ProfileEntity, SubscriptionEntity]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
