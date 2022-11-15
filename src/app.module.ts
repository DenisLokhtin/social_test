import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProfileModule} from "./app/profile/profile.module";
import ormconfig from "@app/ormconfig";

@Module({
    imports: [
        ProfileModule,
        TypeOrmModule.forRoot(ormconfig),
    ],
})
export class AppModule {
}
