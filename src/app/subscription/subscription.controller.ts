import { Controller, Get } from '@nestjs/common';
import {SubscriptionService} from "./subscription.service";
import {SubscriptionEntity} from "@app/entity/subscription.entity";

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {
    }
    @Get()
    async findAll(): Promise<SubscriptionEntity[]> {
        return await this.subscriptionService.findAll()
    }
}
