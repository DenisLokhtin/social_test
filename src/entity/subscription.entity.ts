import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ProfileEntity} from "@app/entity/profile.entity";

@Entity({name: 'subscription'})
export class SubscriptionEntity extends BaseEntity {

    @ManyToOne(() => ProfileEntity, (profile) => profile.id)
    @JoinColumn()
    profile: ProfileEntity;

    @ManyToOne(() => ProfileEntity, (profile) => profile.id)
    @JoinColumn()
    subscription: ProfileEntity;

    @Column({type: 'varchar', length: 300,})
    email_sub: string;

    @Column({type: 'varchar', length: 300,})
    email_profile: string;
}

