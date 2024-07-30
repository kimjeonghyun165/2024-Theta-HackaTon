import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Request() req) {
        const userId = req.user.userId;
        return this.usersService.findOneById(userId);
    }

    @Post('create')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.findOrCreateUser(createUserDto);
    }
}
