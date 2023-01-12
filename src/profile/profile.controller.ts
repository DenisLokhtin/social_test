import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import emailValidate from '../../middlewares/emailValidate';
import { UpdateProfileDto } from '@app/profile/dto/UpdateProfileDto.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ProfileEntity } from '@app/profile/entity/profile.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async findOne(@Param('email') email): Promise<ProfileEntity> {
    const req = await this.profileService.findOne(email);

    return await emailValidate(email, req);
  }

  @Post()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async changeOne(
    @Param('email') email,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const req = await this.profileService.changeOne(email, updateProfileDto);

    return await emailValidate(email, req);
  }
}
