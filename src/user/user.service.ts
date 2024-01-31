import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto';
import * as argon from 'argon2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/database/schemas';
import { RoleEnum } from 'src/enums';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser({ email, password }: RegisterDto) {
        const hashedPassword = await argon.hash(password);

        const newUser = await this.userModel.create({
            username: email,
            email,
            password: hashedPassword,
            role: RoleEnum.USER
        });

        return newUser;
    }

    async getAllUsers() {
        return await this.userModel.find();
    }

    async updateUser(id: string) {}

    async deleteUser(id: string) {}

    async findById(id: string) {
        return await this.userModel.findById(id);
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async findByEmailOrUsernameOrPhoneNumber(
        email: string,
        username: string,
        phoneNumber: string
    ) {
        if (phoneNumber === '') {
            return await this.userModel.findOne({
                $or: [{ email }, { username }]
            });
        }
        return await this.userModel.findOne({
            $or: [{ email }, { username }, { phoneNumber }]
        });
    }
}
