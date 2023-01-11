import { Injectable } from '@nestjs/common';
import { PostEntity } from '@app/app/post/entity/post.entity';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '@app/app/post/dto/CreatePostDto.dto';
import { ProfileEntity } from '@app/app/profile/entity/profile.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(email_profile, datetime): Promise<number[] | string> {
    const result = [];

    const profile = await this.profileRepository.find({
      where: { email: email_profile },
      relations: {
        subscriptions: true,
      },
    });

    if (!profile) return 'такого пользователя не существует';

    const ids = profile[0].subscriptions.map((val) => val.subscriptionId);
    const dateRegEx =
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z$)/;

    if (!datetime) {
      const posts = await this.postRepository.find({
        where: {
          profileId: In([...ids, profile[0].id]),
        },
        take: 20,
        order: { createDateTime: 'DESC' },
      });
      result.push(posts);
    } else {
      if (!dateRegEx.test(datetime)) return 'дата некорректна';
      const posts = await this.postRepository.find({
        where: {
          profileId: In([...ids, profile[0].id]),
          createDateTime: MoreThanOrEqual(datetime),
        },
        order: { createDateTime: 'DESC' },
      });
      result.push(posts);
    }
    return result.flat();
  }

  async createOne(email, createPostDto: CreatePostDto): Promise<any> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';
    return await this.postRepository.save({
      description: createPostDto.message,
      profile: profile,
      profileId: profile.id,
    });
  }
}
