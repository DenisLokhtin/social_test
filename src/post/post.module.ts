import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@app/post/entity/post.entity';
import { ProfileEntity } from '@app/profile/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ProfileEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
