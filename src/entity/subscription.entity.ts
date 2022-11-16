import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    profile_id: string;

    @Column({ type: 'varchar', length: 300 })
    subscription_profile_email  : string;
}

