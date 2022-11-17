import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SubscriptionService} from "./subscription.service";
import {SubscriptionEntity} from "@app/entity/subscription.entity";
import emailValidate from "../../../middlewares/emailValidate";
import {CreateSubscriptionDto} from "@app/dto/CreateSubscriptionDto.dto";

@Controller('subscribe')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {
    }

    @Get()
    async findAll(): Promise<SubscriptionEntity[]> {
        return await this.subscriptionService.findAll()
    }

    @Post()
    async createOne(@Param('email') email_profile, @Body() createSubscriptionDto: CreateSubscriptionDto): Promise<void> {
        const req = await this.subscriptionService.createOne(email_profile, createSubscriptionDto);

        return await emailValidate(email_profile, req);
    }
}
