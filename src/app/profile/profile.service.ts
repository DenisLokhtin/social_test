import {Injectable} from '@nestjs/common';
import {ProfileEntity} from "@app/entity/profile.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private profileRepository: Repository<ProfileEntity>,
    ) {
    }

    async findOne(email): Promise<ProfileEntity> {
        const profile = await this.profileRepository.findOne({where: {email: email}})
        if (profile) return profile

        await this.profileRepository.save({email: email})
        return await this.profileRepository.findOne({where: {email: email}})
    }
}
