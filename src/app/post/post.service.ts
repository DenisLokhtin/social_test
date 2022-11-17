import { Injectable } from '@nestjs/common';
import { PostEntity } from '@app/entity/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '@app/dto/CreatePostDto.dto';
import { ProfileEntity } from '@app/entity/profile.entity';
import { SubscriptionEntity } from '@app/entity/subscription.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async findAll(email: string): Promise<PostEntity[] | string> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';

    const subscription = await this.subscriptionRepository.find({
      where: { email_profile: email },
    });

    const subscription_posts = [];

    if (subscription.length) {
      for (let i = 0; i < subscription.length; i++) {
        const subscription_post = await this.postRepository.find({
          relations: ['profile'],
          take: 20,
          where: { profile_email: subscription[i].email_sub },
        });
        subscription_posts.unshift(subscription_post);
      }
    }

    const user_posts = await this.postRepository.find({
      relations: ['profile'],
      take: 20,
      where: { profile_email: email },
    });
    const arr = [...user_posts, ...subscription_posts];
    return arr.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  async createOne(email, createPostDto: CreatePostDto): Promise<any> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';
    return await this.postRepository.save({
      profile_email: email,
      description: createPostDto.description,
      profile: profile,
    });
  }
}
