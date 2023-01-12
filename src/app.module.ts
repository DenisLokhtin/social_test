import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { PostModule } from '@app/post/post.module';
import { SubscriptionModule } from '@app/subscription/subscription.module';
import { DataSourceOption } from '../db/typeOrm.config';

@Module({
  imports: [
    ProfileModule,
    PostModule,
    SubscriptionModule,
    TypeOrmModule.forRoot(DataSourceOption),
  ],
})
export class AppModule {}
