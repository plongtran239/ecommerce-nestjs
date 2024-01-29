import { IsNotEmpty, IsString } from 'class-validator';

import { AUTH_ERROR_MESSAGES } from 'src/constants';

const {
    USERNAME_IS_STRING,
    EMAIL_IS_STRING,
    PHONE_NUMBER_IS_STRING,
    PASSWORD_IS_STRING,
    PASSWORD_IS_REQUIRED
} = AUTH_ERROR_MESSAGES;

export class LoginDto {
    @IsString({ message: USERNAME_IS_STRING })
    username: string;

    @IsString({ message: EMAIL_IS_STRING })
    email: string;

    @IsString({ message: PHONE_NUMBER_IS_STRING })
    phoneNumber: string;

    @IsString({ message: PASSWORD_IS_STRING })
    @IsNotEmpty({ message: PASSWORD_IS_REQUIRED })
    password: string;
}
