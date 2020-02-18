import { Document } from 'mongoose';

export interface Auth extends Document {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly morph: string;
    readonly morphModel: string;
    readonly accessExpiredAt: Date;
    readonly refreshExpiredAt: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
