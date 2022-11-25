import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProfileEntity } from '@app/entity/profile.entity';

@Entity({ name: 'post' })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
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
