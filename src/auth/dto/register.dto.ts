import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { AUTH_ERROR_MESSAGES } from 'src/constants';

const {
    EMAIL_IS_REQUIRED,
    PASSWORD_IS_REQUIRED,
    PASSWORD_IS_STRING,
    CONFIRM_PASSWORD_IS_REQUIRED,
    CONFIRM_PASSWORD_IS_STRING
} = AUTH_ERROR_MESSAGES;

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty({ message: EMAIL_IS_REQUIRED })
    email: string;

    @IsString({ message: PASSWORD_IS_STRING })
    @IsNotEmpty({ message: PASSWORD_IS_REQUIRED })
    password: string;

    @IsString({ message: CONFIRM_PASSWORD_IS_STRING })
    @IsNotEmpty({ message: CONFIRM_PASSWORD_IS_REQUIRED })
    confirmPassword: string;
}
