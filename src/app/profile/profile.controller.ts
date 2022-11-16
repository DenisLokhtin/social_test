import {Controller, Get, Param} from '@nestjs/common';
import {ProfileService} from "./profile.service";
import {ProfileEntity} from "@app/entity/profile.entity";
import emailValidate from "../../../middlewares/emailValidate";

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {
    }
    @Get()
    async findOne(@Param('email') email): Promise<void> {
        const req =  await this.profileService.findOne(email)

        await emailValidate(email, req)
    }
}
