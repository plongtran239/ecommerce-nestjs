import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';

import { AUTH_SUCCESS_MESSAGES, AUTH_ERROR_MESSAGES } from 'src/constants';
import { LoginDto, RegisterDto } from './dto';
import { UserService } from 'src/user/user.service';

const { EMAIL_EXISTED, CONFIRM_PASSWORD_NOT_MATCH, INVALID_CREDENTIALS } =
    AUTH_ERROR_MESSAGES;

const { LOGIN, REGISTER } = AUTH_SUCCESS_MESSAGES;

@Injectable()
export class AuthService {
    constructor(
        private config: ConfigService,
        private jwt: JwtService,
        private userService: UserService
    ) {}

    async register(dto: RegisterDto) {
        const { email, password, confirmPassword } = dto;

        if ((await this.userService.findByEmail(email)) !== null) {
            throw new BadRequestException(EMAIL_EXISTED);
        }

        if (password !== confirmPassword) {
            throw new BadRequestException(CONFIRM_PASSWORD_NOT_MATCH);
        }

        const newUser = await this.userService.createUser(dto);

        const access_token = this.signToken(
            newUser.id,
            newUser.email,
            newUser.role
        );

        return {
            message: REGISTER,
            access_token
        };
    }

    async login({ email, password, phoneNumber, username }: LoginDto) {
        const user = await this.userService.findByEmailOrUsernameOrPhoneNumber(
            email,
            username,
            phoneNumber
        );

        if (!user) {
            throw new BadRequestException(INVALID_CREDENTIALS);
        }

        const isPasswordMatch = await argon.verify(user.password, password);

        if (!isPasswordMatch) {
            throw new BadRequestException(INVALID_CREDENTIALS);
        }

        const access_token = this.signToken(user.id, user.email, user.role);

        return {
            message: LOGIN,
            access_token
        };
    }

    signToken(userId: string, email: string, role: number) {
        const payload = { sub: userId, email, role };

        return this.jwt.sign(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRES_IN')
        });
    }
}
