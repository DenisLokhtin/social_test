import { Injectable } from '@nestjs/common';
import { SubscriptionEntity } from '@app/entity/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/entity/profile.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(): Promise<SubscriptionEntity[]> {
    return await this.subscriptionRepository.find({
      relations: ['subscription', 'profile'],
    });
  }

  async createOne(
    email_profile,
    createSubscriptionDto,
  ): Promise<({ email_profile: any } & SubscriptionEntity) | string> {
    if (email_profile === createSubscriptionDto.email_sub)
      return 'Вы не можете подписаться на себя';

    const subscription = await this.subscriptionRepository.find({
      where: {
        email_profile: email_profile,
        email_sub: createSubscriptionDto.email_sub,
      },
    });

    if (subscription.length) return 'Вы уже подписаны';

    const profile = await this.profileRepository.findOne({
      where: { email: email_profile },
    });
    const sub_profile = await this.profileRepository.findOne({
      where: { email: createSubscriptionDto.email_sub },
    });

    if (!sub_profile || !profile) return 'Такого пользователя не существует';

    return this.subscriptionRepository.save({
      email_profile: email_profile,
      email_sub: createSubscriptionDto.email_sub,
      profile: profile,
      subscription: sub_profile,
    });
  }
}
