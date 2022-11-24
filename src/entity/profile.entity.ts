import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '@app/entity/post.entity';
import { SubscriptionEntity } from '@app/entity/subscription.entity';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Column({ type: 'varchar', length: 300, default: 'john' })
  first_name: string;

  @Column({ type: 'varchar', length: 300, default: 'doe' })
  last_name: string;

  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @OneToMany(() => PostEntity, (post) => post.profile, { nullable: true })
  @JoinColumn()
  posts: PostEntity[];

  @ManyToMany(() => SubscriptionEntity)
  @JoinTable({ name: 'sub_auto' })
  subscriptions: SubscriptionEntity[];
}
