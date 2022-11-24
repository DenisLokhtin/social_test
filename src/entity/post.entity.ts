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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.posts)
  @JoinColumn()
  profile: ProfileEntity;
}
