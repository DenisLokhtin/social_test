import { Injectable } from '@nestjs/common';
import {SubscriptionEntity} from "@app/entity/subscription.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class SubscriptionService {
    constructor(
        @InjectRepository(SubscriptionEntity)
        private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    ) {}
    async findAll(): Promise<SubscriptionEntity[]> {
        return await this.subscriptionRepository.find()
    }
}
