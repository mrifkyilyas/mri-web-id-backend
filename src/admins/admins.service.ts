import { Injectable, BadRequestException } from '@nestjs/common';
import { createAdminDto } from './dto/create-admin.dto';
import { Admin } from './interfaces/admin.interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel('Admin') private readonly admin: Model<Admin>,
        private readonly authService: AuthService
    ) {}

    async create(createAdminDto: createAdminDto): Promise<Admin> {
        const createdAdmin = new this.admin(createAdminDto);
        const admin = createdAdmin.save();
        return admin;        
    }

    async list(): Promise<Admin[]> {
        let cursor = this.admin.find();
        // if (sort) cursor.sort({ [sort[0]]: sort[1] });
        // if (skip) cursor.skip(skip);
        // if (limit) cursor.limit(limit);
        const admins = await cursor.exec();
        const count = await this.admin.countDocuments();
        return [admins, count ];

    }

    async login(email: string, password: string): Promise<[Admin, string, string]> {
        let admin = await this.admin.findOne({ email: email }).exec();
        if (!admin) throw new BadRequestException('Invalid credentials!');
        let pass = await bcrypt.compare(password, admin.password);
        if (!pass) throw new BadRequestException('Invalid credentials!');

        let payload = {
            sub: admin._id,
            email: admin.email,
            type: 'Admin'
        };

        let auth = await this.authService.login(payload);

        return [admin, auth.accessToken, auth.refreshToken];       
    }
}
