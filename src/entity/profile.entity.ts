import {Entity, Column, OneToMany} from 'typeorm';
import { BaseEntity } from './base.entity';
import {SubscriptionEntity} from "@app/entity/subscription.entity";

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300, default: 'john'})
    first_name: string;

    @Column({ type: 'varchar', length: 300, default: 'doe'})
    last_name: string;

    @Column({ type: 'varchar', length: 300, unique: true,})
    email: string;

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.subscription_profile_email, {onUpdate: 'CASCADE'})
    subscription: string;
}