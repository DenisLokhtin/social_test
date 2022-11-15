import { Controller, Get } from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ProfileEntity} from "@app/entity/profile.entity";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
    @Get()
    async findAll(): Promise<ProfileEntity[]> {
        return await this.profileService.findAll()
    }
}
