import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ProfileEntity} from "@app/entity/profile.entity";

@Entity({name: 'post'})
export class PostEntity extends BaseEntity {

    @Column({type: 'varchar', length: 255})
    description: string;

    @Column({type: 'varchar', length: 255})
    profile_email: string;

    @ManyToOne(() => ProfileEntity, (profile) => profile.id)
    @JoinColumn()
    profile: ProfileEntity;
}