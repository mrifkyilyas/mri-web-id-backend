import { IsNotEmpty, IsEmail, MinLength} from 'class-validator';
import { MatchesProperty } from '../../global/validator/MatchesProperty';

export class createAdminDto {
    @IsNotEmpty()
    readonly firstName: string;
    readonly lastName: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
    @IsNotEmpty()
    @MinLength(6)
    @MatchesProperty('password')
    readonly passwordConfirmation: string;
    readonly dateOfBirth: Date;
}