import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscriptionService } from '@app/app/subscription/subscription.service';
import emailValidate from '../../../middlewares/emailValidate';
import { CreateSubscriptionDto } from '@app/dto/CreateSubscriptionDto.dto';

@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll(@Param('email') email_profile): Promise<void | string> {
    const req = await this.subscriptionService.findAll(email_profile);

    return await emailValidate(email_profile, req);
  }

  @Delete()
  async deleteAll(@Param('email') email_profile): Promise<void | string> {
    const req = await this.subscriptionService.deleteAll(email_profile);

    return await emailValidate(email_profile, req);
  }

  @Post()
  async createOne(
    @Param('email') email_profile,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<void | string> {
    const req = await this.subscriptionService.createOne(
      email_profile,
      createSubscriptionDto,
    );

    return await emailValidate(email_profile, req);
  }
}
