import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { PATHS } from 'src/constants';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

const { NAME, LOGIN, REGISTER } = PATHS.AUTH;

@Controller(NAME)
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post(REGISTER)
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post(LOGIN)
    @HttpCode(HttpStatus.OK)
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
}
