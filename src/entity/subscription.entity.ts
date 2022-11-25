import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '@app/entity/profile.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'profile' })
  profile: ProfileEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscription' })
  subscription: ProfileEntity;

  @Column()
  profileId: number;

  @Column()
  subscriptionId: number;
}
