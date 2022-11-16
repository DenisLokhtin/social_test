import {Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import { BaseEntity } from './base.entity';
import {SubscriptionEntity} from "@app/entity/subscription.entity";
import {ProfileEntity} from "@app/entity/profile.entity";

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {

    @OneToOne(() => ProfileEntity, (profile) => profile.email, {onUpdate: 'CASCADE'})
    @JoinColumn({name: 'author_email'})
    author_email: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;
}