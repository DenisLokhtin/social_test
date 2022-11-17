import {Module} from '@nestjs/common';
import {SubscriptionController} from "./subscription.controller";
import {SubscriptionService} from "./subscription.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubscriptionEntity} from "@app/entity/subscription.entity";
import {ProfileEntity} from "@app/entity/profile.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SubscriptionEntity, ProfileEntity])],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
})
export class SubscriptionModule {
}