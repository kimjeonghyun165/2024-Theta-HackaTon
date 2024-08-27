import { Controller, Get, Post, Put, Body, Param, Request, UseGuards, HttpCode, HttpStatus, Query, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';
import { FilterModelDto } from 'src/models/dto/filter-model.dto';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { TokenType } from 'src/common/decorators/token-type.decorator';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Get('account')
    getMe(@Request() req) {
        const userId = req.user.userId;
        return this.usersService.findOneById(userId);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Put('update')
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const userId = req.user.userId;
        return this.usersService.updateUser(userId, updateUserDto);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Get('my-models')
    async getUserModels(
        @Request() req,
        @Query() filterModelDto: FilterModelDto,
    ) {
        console.log(filterModelDto)
        const userId = req.user.userId;
        return this.usersService.getUserModels(userId, filterModelDto);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Put('set-representative-model')
    async setRepresentativeModel(@Request() req, @Body('modelId') modelId: string) {
        const userId = req.user.userId;
        return this.usersService.setRepresentativeModel(userId, modelId);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Patch('like/:id')
    async toggleLikeModel(@Param('id') id: string, @Request() req) {
        const userId = req.user.userId;
        return this.usersService.toggleLikeModel(userId, id);
    }
}

