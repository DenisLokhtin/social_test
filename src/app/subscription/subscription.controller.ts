import { Body, Controller, Param, Post } from '@nestjs/common';
import { SubscriptionService } from '@app/app/subscription/subscription.service';
import emailValidate from '../../../middlewares/emailValidate';

@Controller('subscribe')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async createOne(
    @Param('email') email_profile,
    @Body() email_sub: 'email_sub',
  ): Promise<void | string> {
    const req = await this.subscriptionService.createOne(
      email_profile,
      email_sub,
    );

    return await emailValidate(email_profile, req);
  }
}
