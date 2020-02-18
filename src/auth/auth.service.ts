import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from './interfaces/auth.interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('Auth') private readonly auth: Model<Auth>,
        private readonly jwtService: JwtService
    ) {}

    async login(payload: any): Promise<Model<Auth>> {
        const [accessToken, refreshToken] = this.generateToken(payload);
        const auth = new this.auth({
            accessToken: accessToken,
            refreshToken: refreshToken,
            morph: payload.sub,
            morphModel: 'Admin' 
        });
        const res = await auth.save;

        return auth;
    }

    generateToken(payload: any = {}):[string, string] {
        const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_TTL });
        const refreshToken = this.jwtService.sign({}, { expiresIn: process.env.JWT_REFRESH_TTL });
        return [accessToken, refreshToken];
    }

}
