import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '@app/entity/profile.entity';
import { SubscriptionEntity } from '@app/entity/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async createOne(
    email_profile,
    email_sub,
  ): Promise<
    | SubscriptionEntity
    | string
    | ProfileEntity[]
    | SubscriptionEntity[]
    | ProfileEntity
  > {
    if (email_profile === email_sub.email_sub)
      return 'Вы не можете подписаться на себя';

    const ProfileWithRelation = await this.profileRepository.findOne({
      where: { email: email_profile },
      relations: { subscriptions: true },
    });

    const Profile = await this.profileRepository.findOne({
      where: { email: email_profile },
    });

    const subscriber = await this.profileRepository.findOne({
      where: { email: email_sub.email_sub },
    });

    if (!Profile || !subscriber) return 'такого пользователя не существует';

    const subscribe = await this.subscriptionRepository.findOne({
      where: { profileId: Profile.id, subscriptionId: subscriber.id },
    });

    console.log(subscribe);

    if (subscribe) return 'Такая подпписка уже существует';

    const subscription = await this.subscriptionRepository.save({
      profile: Profile,
      subscription: subscriber,
      profileId: Profile.id,
      subscriptionId: subscriber.id,
    });

    ProfileWithRelation.subscriptions.push(subscription);

    await this.profileRepository.save(ProfileWithRelation);

    return subscription;
  }
}
