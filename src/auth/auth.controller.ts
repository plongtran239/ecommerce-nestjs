import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PATHS } from 'src/constants';

const { NAME, LOGIN, REGISTER } = PATHS.AUTH;

@Controller(NAME)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post(REGISTER)
    register() {
        return this.authService.register();
    }

    @Post(LOGIN)
    @HttpCode(HttpStatus.OK)
    login() {
        return this.authService.login();
    }
}
