import { Controller, Get, Post, Put, Body, Param, Request, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto) {
        return this.usersService.findOrCreateUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update')
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const userId = req.user.userId;
        return this.usersService.updateUser(userId, updateUserDto);
    }
}
