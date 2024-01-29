import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as argon from 'argon2';

import { Roles } from 'src/enums';
import { AUTH_SUCCESS_MESSAGES, AUTH_ERROR_MESSAGES } from 'src/constants';
import { User } from 'src/database/schemas';
import { LoginDto, RegisterDto } from './dto';

const { EMAIL_EXISTED, CONFIRM_PASSWORD_NOT_MATCH, INVALID_CREDENTIALS } =
    AUTH_ERROR_MESSAGES;

const { LOGIN, REGISTER } = AUTH_SUCCESS_MESSAGES;

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private config: ConfigService,
        private jwt: JwtService
    ) {}

    async register({ email, password, confirmPassword }: RegisterDto) {
        if ((await this.findByEmail(email)) !== null) {
            throw new BadRequestException(EMAIL_EXISTED);
        }

        if (password !== confirmPassword) {
            throw new BadRequestException(CONFIRM_PASSWORD_NOT_MATCH);
        }

        const hashedPassword = await argon.hash(password);

        const newUser = await this.userModel.create({
            username: email,
            email,
            password: hashedPassword,
            role: Roles.USER
        });

        const access_token = this.signToken(newUser.id, newUser.email);

        return {
            message: REGISTER,
            access_token
        };
    }

    async login({ email, password, phoneNumber, username }: LoginDto) {
        console.log(email, password, phoneNumber, username);

        const user = await this.userModel.findOne({
            $or: [{ email }, { phoneNumber }, { username }]
        });

        console.log(user);

        if (!user) {
            throw new BadRequestException(INVALID_CREDENTIALS);
        }

        const isPasswordMatch = await argon.verify(user.password, password);

        if (!isPasswordMatch) {
            throw new BadRequestException(INVALID_CREDENTIALS);
        }

        const access_token = this.signToken(user.id, user.email);

        return {
            message: LOGIN,
            access_token
        };
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email }).lean();
    }

    signToken(userId: string, email: string) {
        const payload = { sub: userId, email };

        return this.jwt.sign(payload, {
            secret: this.config.get('JWT_SECRET'),
            expiresIn: this.config.get('JWT_EXPIRES_IN')
        });
    }
}
