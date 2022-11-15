import { Injectable } from '@nestjs/common';
import {ProfileEntity} from "@app/entity/profile.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(ProfileEntity)
        private readonly profileRepository: Repository<ProfileEntity>,
    ) {}
   async findAll(): Promise<ProfileEntity[]> {
       return await this.profileRepository.find()
   }
}
