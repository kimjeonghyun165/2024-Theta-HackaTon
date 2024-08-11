import { Controller, Get, Post, Put, Body, Param, Request, UseGuards, HttpCode, HttpStatus, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';
import { FilterModelDto } from 'src/models/dto/filter-model.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('account')
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

    @UseGuards(JwtAuthGuard)
    @Get('my-models')
    async getUserModels(
        @Request() req,
        @Query() filterModelDto: FilterModelDto,
    ) {
        const userId = req.user.userId;
        return this.usersService.getUserModels(userId, filterModelDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put('set-representative-model')
    async setRepresentativeModel(@Request() req, @Body('modelId') modelId: string) {
        const userId = req.user.userId;
        return this.usersService.setRepresentativeModel(userId, modelId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('like/:id')
    async toggleLikeModel(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        return this.usersService.toggleLikeModel(userId, id);
    }
}

