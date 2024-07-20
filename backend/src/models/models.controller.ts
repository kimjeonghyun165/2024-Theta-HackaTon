import { Controller, Post, Body, Param, UseGuards, Request, Get, Query } from '@nestjs/common';
import { ModelsService } from './models.service';
import { CreateModelDto } from './dto/create-model.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';


@Controller('models')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) { }

    @UseGuards(JwtAuthGuard)
    @Post('postmodel')
    async createModel(
        @Request() req,
        @Body() createModelDto: CreateModelDto,
    ) {
        const userId = req.user.userId
        return this.modelsService.createModel(createModelDto, userId);
    }

    @Get("getallmodels")
    async getAllModels(
        @Query('offset') offset: number = 0,
        @Query('limit') limit: number = 30,
    ) {
        return this.modelsService.getAllModels(offset, limit);
    }

    @Get('getmodel/:id')
    async getModelById(@Param('id') id: string) {
        return this.modelsService.getModelById(id);
    }
}
