import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './app/profile/profile.module';
import { PostModule } from '@app/app/post/post.module';
import { SubscriptionModule } from '@app/app/subscription/subscription.module';
import { DataSourceOption } from '@app/typeOrm.config';

@Module({
  imports: [
    ProfileModule,
    PostModule,
    SubscriptionModule,
    TypeOrmModule.forRoot(DataSourceOption),
  ],
})
export class AppModule {}
