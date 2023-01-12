import { Injectable } from '@nestjs/common';
import { ProfileEntity } from '@app/profile/entity/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateProfileDto } from '@app/profile/dto/UpdateProfileDto.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findOne(email): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (profile) return profile;
    return await this.profileRepository.save({ email: email });
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
