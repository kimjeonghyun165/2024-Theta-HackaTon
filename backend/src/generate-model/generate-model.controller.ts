import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard.ts';
import { GenerateImageRequestDto, GenerateLowPolyModelRequestDto, GenerateRealisticModelRequestDto } from './dto/generate-model.dto';
import { GenerateModelService } from './generate-model.service';

@Controller('generate')
export class GenerateModelController {
    constructor(private readonly generateModelsService: GenerateModelService) { }

    @UseGuards(JwtAuthGuard)
    @Post('image')
    async generateImage(
        @Request() req,
        @Body() requestDto: GenerateImageRequestDto
    ) {
        const userId = req.user.userId;
        return this.generateModelsService.generateImage(userId, requestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('model-lowpoly')
    async generateLowPolyModel(
        @Request() req,
        @Body() requestDto: GenerateLowPolyModelRequestDto
    ) {
        const userId = req.user.userId;
        return this.generateModelsService.generateLowPolyModel(userId, requestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('model-realistic')
    async generateRealisticModel(
        @Request() req,
        @Body() requestDto: GenerateRealisticModelRequestDto
    ) {
        const userId = req.user.userId;
        return this.generateModelsService.generateRealisticModel(userId, requestDto);
    }
}
