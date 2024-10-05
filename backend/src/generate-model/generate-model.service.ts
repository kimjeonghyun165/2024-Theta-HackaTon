import { Injectable, ArgumentsHost } from '@nestjs/common';
import {
  generateImage,
  generateLowPoly3DModel,
  generateRealistic3DModel,
} from 'src/common/api/generateModelApi';
import { UsersService } from 'src/users/users.service';
import {
  GenerateImageRequestDto,
  GenerateLowPolyModelRequestDto,
  GenerateRealisticModelRequestDto,
} from './dto/generate-model.dto';
import { HttpErrorException } from '../common/exceptions/http-error.exception.ts';
import {
  INSUFFICIENT_CREDITS,
  INTERNAL_SERVER_ERROR,
  USER_NOT_FOUND,
} from 'src/common/exceptions/error.code';

@Injectable()
export class GenerateModelService {
  private readonly creditCosts = {
    image: 5,
    lowPoly: 20,
    realistic: 30,
    superResolution: 20,
  };

  constructor(private readonly userService: UsersService) {}

  async generateImage(
    userId: string,
    requestDto: GenerateImageRequestDto,
    host?: ArgumentsHost,
  ) {
    const cost = this.creditCosts.image;

    await this.validateUserCredits(userId, cost, host);

    try {
      const result = await generateImage(requestDto.prompt);
      await this.userService.deductCredits(userId, cost);
      return result;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async generateRealisticModel(
    userId: string,
    requestDto: GenerateRealisticModelRequestDto,
    host?: ArgumentsHost,
  ) {
    let cost = this.creditCosts.realistic;
    if (requestDto.superResolution) {
      cost += this.creditCosts.superResolution;
    }

    await this.validateUserCredits(userId, cost, host);

    try {
      const result = await generateRealistic3DModel(
        requestDto.imageUrl,
        requestDto.superResolution,
      );
      await this.userService.deductCredits(userId, cost);
      return result;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async generateLowPolyModel(
    userId: string,
    requestDto: GenerateLowPolyModelRequestDto,
    host?: ArgumentsHost,
  ) {
    const cost = this.creditCosts.lowPoly;

    await this.validateUserCredits(userId, cost, host);

    try {
      const result = await generateLowPoly3DModel(
        requestDto.imageUrl,
        requestDto.lowPolyStrength,
      );

      await this.userService.deductCredits(userId, cost);
      return result;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  private async validateUserCredits(
    userId: string,
    cost: number,
    host?: ArgumentsHost,
  ) {
    const user = await this.userService.findOneById(userId);
    if (user.credits < cost) {
      throw new HttpErrorException(INSUFFICIENT_CREDITS, host);
    }
    return user;
  }
}
