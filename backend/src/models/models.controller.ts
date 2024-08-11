import { Controller, Post, Body, Param, UseGuards, Request, Get, Query, Put, Delete, Patch } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';
import { FilterModelDto } from './dto/filter-model.dto';

@Controller('model')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createModel(
        @Request() req,
        @Body() createModelDto: CreateModelDto,
    ) {
        const userId = req.user.userId;
        return this.modelsService.createModel(createModelDto, userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async updateModel(
        @Request() req,
        @Param('id') id: string,
        @Body() updateModelDto: UpdateModelDto,
    ) {
        const userId = req.user.userId
        return this.modelsService.updateModel(userId, id, updateModelDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteModel(
        @Request() req,
        @Param('id') id: string) {
        const userId = req.user.userId
        return this.modelsService.deleteModel(userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('like/:id')
    async likeModel(@Param('id') id: string) {
        return this.modelsService.likeModel(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('unlike/:id')
    async unlikeModel(@Param('id') id: string) {
        return this.modelsService.unlikeModel(id);
    }

    @Get('filter')
    async getFilterPublicModels(
        @Query() filterModelDto: FilterModelDto,
    ) {
        return this.modelsService.getFilterPublicModels(filterModelDto);
    }

    @Get("list") // 곧 삭제 예정
    async getAllModels(
        @Query('offset') offset: number = 0,
        @Query('limit') limit: number = 30,
    ) {
        return this.modelsService.getAllModels(offset, limit);
    }

    @Get('/:id')
    async getModelById(@Param('id') id: string) {
        return this.modelsService.getModelById(id);
    }

}
