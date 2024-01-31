import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { PATHS } from 'src/constants';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator';
import { RoleEnum } from 'src/enums';

const { NAME, ID, PROFILE } = PATHS.USERS;

@Controller(NAME)
@UseGuards(JwtGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @Roles(RoleEnum.ADMIN)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(PROFILE)
    getMyProfile() {
        return 'My Profile';
    }

    @Put(ID)
    updateUser(@Param('id') id: string) {
        return 'Update User';
    }

    @Delete(ID)
    deleteUser(@Param('id') id: string) {
        return 'Delete User';
    }
}
