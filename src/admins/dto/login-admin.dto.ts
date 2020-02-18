import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class LoginAdminDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;
}