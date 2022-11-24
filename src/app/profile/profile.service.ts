import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '@app/entity/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from '@app/dto/UpdateProfileDto.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findOne(email): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
      select: {
        subscriptions: { id: true },
        id: true,
        createDateTime: true,
        first_name: true,
        last_name: true,
        email: true,
      },
      relations: {
        posts: true,
        subscriptions: { subscription: true },
      },
    });
    if (profile) return profile;
    await this.profileRepository.save({ email: email });
    return await this.profileRepository.findOne({ where: { email: email } });
  }

  async changeOne(
    email,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (profile) {
      await this.profileRepository.update({ email: email }, updateProfileDto);
      return await this.profileRepository.findOne({ where: { email: email } });
    }
  }
}
