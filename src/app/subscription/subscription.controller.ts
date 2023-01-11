import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from '@app/app/subscription/subscription.service';
import emailValidate from '../../../middlewares/emailValidate';
import { CreateSubscriptionDto } from '@app/app/subscription/dto/CreateSubscriptionDto.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SubscriptionEntity } from '@app/app/subscription/entity/subscription.entity';

@ApiTags('subscribe')
@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async findAll(
    @Param('email') email_profile,
  ): Promise<SubscriptionEntity | string> {
    const req = await this.subscriptionService.findAll(email_profile);

    return await emailValidate(email_profile, req);
  }

  @Delete()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async deleteAll(
    @Param('email') email_profile,
  ): Promise<SubscriptionEntity | string> {
    const req = await this.subscriptionService.deleteAll(email_profile);

    return await emailValidate(email_profile, req);
  }

  @Post()
  @ApiParam({
    name: 'email',
    type: 'string',
    description: 'enter email',
    required: true,
  })
  async createOne(
    @Param('email') email_profile,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionEntity | string> {
    const req = await this.subscriptionService.createOne(
      email_profile,
      createSubscriptionDto,
    );

    return await emailValidate(email_profile, req);
  }
}
