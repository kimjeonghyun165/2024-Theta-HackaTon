import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto) {
        const user = await this.authService.validateUser(createUserDto.address, createUserDto.signature, createUserDto.message);
        if (!user) {
            throw new Error('Invalid signature');
        }
        return this.authService.login(createUserDto);
    }
}
