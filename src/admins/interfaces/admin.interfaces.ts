import { Document } from 'mongoose';

export interface Admin extends Document {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly dateOfBirth: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
