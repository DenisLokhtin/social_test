import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '@app/app/profile/entity/profile.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createDateTime: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column()
  profileId: number;

  @ManyToOne(() => ProfileEntity, (profile) => profile.posts, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: ProfileEntity;
}
