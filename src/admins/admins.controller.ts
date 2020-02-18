import { Controller, Get, Post, Body, Query, Request } from '@nestjs/common';
import { createAdminDto } from './dto/create-admin.dto';
import { AdminsService } from './admins.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admins')
export class AdminsController {
    constructor(
        private readonly adminsServices: AdminsService,
    ){}

    @Post('create')
    async register(
        @Body() createAdminDto: createAdminDto,
    ) {
        const admin = await this.adminsServices.create(createAdminDto);
        return { admin: admin };        
    }       

    @Get('list')
    async list() {
        const [admins, count] = await this.adminsServices.list();
        return { admins, count };                     
    }

    @Post('login')
    async login(@Body() loginAdminDto: LoginAdminDto) {
        const [admin, accessToken, refreshToken] = await this.adminsServices.login(
            loginAdminDto.email,
            loginAdminDto.password
        )
        return { accessToken, refreshToken, admin }        
    }
}
