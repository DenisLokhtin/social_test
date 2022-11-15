import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'post' })
export class PostEntity extends BaseEntity {

    @Column({ type: 'varchar', length: 300 })
    author: string;

    @Column({ type: 'varchar', length: 300 })
    author_email: string;

    @Column({ type: 'varchar', length: 300 })
    description: string;
}