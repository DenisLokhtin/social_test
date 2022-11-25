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

  async findAll(email_profile): Promise<SubscriptionEntity[] | string> {
    const profile = await this.profileRepository.findOne({
      where: { email: email_profile },
    });

    if (!profile) return 'такого пользователя не существует';

    return await this.subscriptionRepository.find({
      where: { profileId: profile.id },
    });
  }

  async createOne(
    email_profile,
    email_sub,
  ): Promise<SubscriptionEntity | string> {
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

  async deleteAll(email_profile): Promise<string> {
    const profile = await this.profileRepository.findOne({
      where: { email: email_profile },
    });

    await this.subscriptionRepository.delete({
      profileId: profile.id,
    });

    return 'successfully deleted';
  }
}
