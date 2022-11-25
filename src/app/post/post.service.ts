import { Injectable } from '@nestjs/common';
import { PostEntity } from '@app/entity/post.entity';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '@app/dto/CreatePostDto.dto';
import { ProfileEntity } from '@app/entity/profile.entity';

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

    if (!datetime) {
      console.log('без');
      const posts = await this.postRepository.find({
        where: {
          profileId: In([...ids, profile[0].id]),
        },
        take: 20,
      });

      result.push(posts);
    } else {
      console.log('с', datetime);
      const posts = await this.postRepository.find({
        where: {
          profileId: In([...ids, profile[0].id]),
          createDateTime: MoreThanOrEqual(datetime),
        },
      });

      result.push(posts);
    }

    return result.flat().slice(-20).reverse();
  }

  async createOne(email, createPostDto: CreatePostDto): Promise<any> {
    const profile = await this.profileRepository.findOne({
      where: { email: email },
    });
    if (!profile) return 'Такого пользователя не существует';
    return await this.postRepository.save({
      description: createPostDto.description,
      profile: profile,
      profileId: profile.id,
    });
  }
}
