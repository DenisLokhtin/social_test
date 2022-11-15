import {Module} from '@nestjs/common';
import {SubscriptionController} from "./subscription.controller";
import {SubscriptionService} from "./subscription.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriptionEntity} from "@app/entity/subscription.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
})
export class SubscriptionModule {
}