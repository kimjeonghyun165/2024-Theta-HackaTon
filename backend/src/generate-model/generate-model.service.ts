import { BadRequestException, Injectable } from '@nestjs/common';
import { generateImage, generateLowPoly3DModel, generateRealistic3DModel } from 'src/common/api/generateModelApi';
import { UsersService } from 'src/users/users.service';
import { GenerateImageRequestDto, GenerateLowPolyModelRequestDto, GenerateModelRequestDto, GenerateRealisticModelRequestDto } from './dto/generate-model.dto';

@Injectable()
export class GenerateModelService {
    private readonly creditCosts = {
        image: 5,
        lowPoly: 20,
        realistic: 30,
        superResolution: 20
    };

    constructor
        (
            private readonly userService: UsersService,
        ) { }

    async generateImage(userId: string, requestDto: GenerateImageRequestDto) {
        const cost = this.creditCosts.image;
        const user = await this.userService.findOneById(userId);

        if (user.credits < cost) {
            throw new BadRequestException('Insufficient credits');
        }
        const result = await generateImage(requestDto.prompt);
        await this.userService.deductCredits(userId, cost);
        return result;
    }

    async generateRealisticModel(userId: string, requestDto: GenerateRealisticModelRequestDto) {
        let cost = this.creditCosts.realistic;
        if (requestDto.superResolution === true) {
            cost += this.creditCosts.superResolution;
        }
        const user = await this.userService.findOneById(userId);

        if (user.credits < cost) {
            throw new BadRequestException('Insufficient credits');
        }
        try {
            const result = await generateRealistic3DModel(requestDto.imageUrl, requestDto.superResolution);
            await this.userService.deductCredits(userId, cost);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async generateLowPolyModel(userId: string, requestDto: GenerateLowPolyModelRequestDto) {
        const cost = this.creditCosts.lowPoly;
        const user = await this.userService.findOneById(userId);

        if (user.credits < cost) {
            throw new BadRequestException('Insufficient credits');
        }
        const result = await generateLowPoly3DModel(requestDto.imageUrl, requestDto.lowPolyStrength);
        await this.userService.deductCredits(userId, cost);
        console.log(cost)
        return result;
    }
}


