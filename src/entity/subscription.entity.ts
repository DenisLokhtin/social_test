import {Column, Entity, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ProfileEntity} from "@app/entity/profile.entity";

@Entity({name: 'subscription'})
export class SubscriptionEntity extends BaseEntity {

    @ManyToOne(() => ProfileEntity, (profile) => profile.email)
    @JoinColumn({name: 'profile_email'})
    profile_email: string;

    @ManyToOne(() => ProfileEntity, (profile) => profile.email)
    @JoinColumn({name: 'subscription_profile_email'})
    subscription_profile_email: string;

}

