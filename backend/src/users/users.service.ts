import {
  ArgumentsHost,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import {
  ACCOUNT_NOT_ACTIVE,
  ErrorCode,
  INTERNAL_SERVER_ERROR,
  MODEL_NOT_BELONG_TO_USER,
  USER_NOT_FOUND,
} from 'src/common/exceptions/error.code';
import { HttpErrorException } from 'src/common/exceptions/http-error.exception.ts';
import { FilterModelDto } from 'src/models/dto/filter-model.dto';
import { ModelsService } from 'src/models/models.service';
import { Model } from 'src/models/schema/model.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { SurveyDto } from './dto/survey.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: MongooseModel<User>,
    private readonly modelService: ModelsService,
  ) {}

  async findOrCreateUser(
    createUserDto: CreateUserDto,
    isSsoLogin: boolean,
    provider: 'google' | 'facebook' | 'apple' | 'email',
    host?: ArgumentsHost,
  ): Promise<User> {
    const { email } = createUserDto;
    let user = await this.findByEmail(email);

    if (user) {
      this.verifyProvider(user, provider);

      if (user.status === 'pending') {
        if (
          user.loginMethod.method === 'email' &&
          !user.loginMethod.password &&
          provider === 'email'
        ) {
          throw new HttpErrorException(ACCOUNT_NOT_ACTIVE, host);
        }
        return user;
      }

      if (user.status === 'active') {
        return user;
      }

      throw new HttpErrorException(ACCOUNT_NOT_ACTIVE, host);
    } else {
      return this.createUser(createUserDto, isSsoLogin, provider);
    }
  }

  async createUser(
    createUserDto: CreateUserDto,
    isSsoLogin: boolean = true,
    loginProvider: string,
  ): Promise<User> {
    const { username, email, profileImg } = createUserDto;
    const newUser = new this.userModel({
      username,
      email,
      profileImg,
      loginMethod: {
        method: loginProvider,
        isEmailVerified: isSsoLogin ? true : false,
      },
      status: 'pending',
      isSurveyComplete: false,
    });
    return newUser.save();
  }

  async getUserModels(
    userId: string,
    filterModelDto: FilterModelDto,
  ): Promise<Model[]> {
    const user = await this.findOneById(userId);
    const modelIds = user.models;
    if (modelIds.length === 0) {
      return [];
    }
    const filter: any = { ...filterModelDto, _id: { $in: modelIds } };

    const models = await this.modelService.getFilteredModels(filter);
    return models;
  }

  async setProfileImg(
    userId: string,
    modelId: string,
    host?: ArgumentsHost,
  ): Promise<User> {
    const user = await this.validateUser(userId, host);
    const modelObjectId = new Types.ObjectId(modelId);

    if (!user.models.includes(modelObjectId)) {
      throw new HttpErrorException(MODEL_NOT_BELONG_TO_USER, host);
    }

    const modeldoc = await this.modelService.getModelById(modelId);
    return this.updateUser(userId, { profileImg: modeldoc.preview }, host);
  }

  async toggleLikeModel(userId: string, modelId: string): Promise<Model> {
    const user = await this.userModel.findById(userId);
    const modelObjectId = new Types.ObjectId(modelId);

    if (user.likedModels.includes(modelObjectId)) {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { likedModels: modelObjectId },
      });

      return this.modelService.unlikeModel(modelId);
    } else {
      await this.userModel.findByIdAndUpdate(userId, {
        $addToSet: { likedModels: modelObjectId },
      });

      return this.modelService.likeModel(modelId);
    }
  }

  async deductCredits(userId: string, amount: number): Promise<User> {
    const user = await this.findOneById(userId);

    const updatedUser = await this.updateUser(userId, {
      credits: user.credits - amount,
    });
    return updatedUser;
  }

  async addCredits(userId: string, amount: number): Promise<User> {
    const user = await this.findOneById(userId);

    const updatedUser = await this.updateUser(userId, {
      credits: user.credits + amount,
    });

    return updatedUser;
  }

  async completeSurvey(userId: string, surveyDto: SurveyDto): Promise<User> {
    const updateUserDto: UpdateUserDto = {
      survey: surveyDto,
      status: 'active',
      isSurveyCompleted: true,
    };

    const user = await this.updateUser(userId, updateUserDto);
    if (user.status === 'active' && user.isSurveyCompleted) {
      await this.addCredits(userId, 250);
      return user;
    } else {
      return null;
    }
  }

  //----------------------------- 기본이 되는 함수들 -------------------------------//

  async deleteUser(userId: string, host?: ArgumentsHost): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      throw new HttpErrorException(USER_NOT_FOUND, host);
    }
  }

  async updateUser(
    userId: string | Types.ObjectId,
    updateUserDto: any,
    host?: ArgumentsHost,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();

    if (!user) {
      throw new HttpErrorException(USER_NOT_FOUND, host);
    }

    return user;
  }

  async findOneById(userId: string, host?: ArgumentsHost): Promise<User> {
    try {
      return await this.validateUser(userId, host);
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async findByEmail(email: string, host?: ArgumentsHost): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async findByEmailforPassword(
    email: string,
    host?: ArgumentsHost,
  ): Promise<User> {
    try {
      const user = await this.userModel
        .findOne({ email })
        .select('+loginMethod.password')
        .exec();

      if (!user) {
        throw new HttpErrorException(USER_NOT_FOUND, host);
      }

      return user;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  private async validateUser(
    userId: string,
    host?: ArgumentsHost,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new HttpErrorException(USER_NOT_FOUND, host);
    }
    return user;
  }

  private verifyProvider(
    user: User,
    provider: string,
    host?: ArgumentsHost,
  ): void {
    if (user.loginMethod.method !== provider) {
      throw new HttpErrorException(
        new ErrorCode(
          400,
          `This email is already registered with ${user.loginMethod.method}. Please use ${user.loginMethod.method} to log in.`,
        ),
        host,
      );
    }
  }
}
