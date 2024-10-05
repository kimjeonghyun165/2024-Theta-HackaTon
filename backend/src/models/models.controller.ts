import { Controller, Post, Body, Param, UseGuards, Request, Get, Query, Put, Delete, Patch } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FilterModelDto } from './dto/filter-model.dto';
import { TokenTypeGuard } from 'src/common/guards/token-type.guard';
import { TokenType } from 'src/common/decorators/token-type.decorator';

@Controller('model')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) { }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Post('create')
    async createModel(
        @Request() req,
        @Body() createModelDto: CreateModelDto,
    ) {
        const userId = req.user.userId;
        return this.modelsService.createModel(createModelDto, userId);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Put('update/:id')
    async updateModel(
        @Request() req,
        @Param('id') id: string,
        @Body() updateModelDto: UpdateModelDto,
    ) {
        const userId = req.user.userId
        return this.modelsService.updateModel(userId, id, updateModelDto);
    }

    @UseGuards(JwtAuthGuard, TokenTypeGuard)
    @TokenType('login')
    @Delete('delete/:id')
    async deleteModel(
        @Request() req,
        @Param('id') id: string) {
        const userId = req.user.userId
        return this.modelsService.deleteModel(userId, id);
    }

    @Get('filter')
    async getFilterPublicModels(
        @Query() filterModelDto: FilterModelDto,
    ) {
        return this.modelsService.getFilterPublicModels(filterModelDto);
    }

    @Get('/:id')
    async getModelById(@Param('id') id: string) {
        return this.modelsService.getModelById(id);
    }

}
