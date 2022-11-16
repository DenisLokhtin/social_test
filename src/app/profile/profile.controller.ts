import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import emailValidate from "../../../middlewares/emailValidate";
import {UpdateProfileDto} from "@app/dto/UpdateProfileDto.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }

    @Get()
    async findOne(@Param('email') email): Promise<void> {
        const req = await this.profileService.findOne(email)

        return await emailValidate(email, req)
    }

    @Post()
    async changeOne(@Param('email') email, @Body() updateProfileDto: UpdateProfileDto): Promise<void> {
        const req = await this.profileService.changeOne(email, updateProfileDto)

        return await emailValidate(email, req)
    }
}
