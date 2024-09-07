import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
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
        private readonly modelService: ModelsService) { }


    async findOrCreateUser(
        createUserDto: CreateUserDto,
        isSsoLogin: boolean,
        provider: 'google' | 'facebook' | 'apple' | 'email'
    ): Promise<any> {
        const { email } = createUserDto;
        let user = await this.findByEmail(email)

        if (user) {
            if (user.status === 'pending') {
                if (user.loginMethod.method === 'email' && !user.loginMethod.password && provider === 'email') {
                    return
                }
                else if (user.loginMethod.method !== provider) {
                    throw new BadRequestException(`This email is already registered with ${user.loginMethod.method}. Please use ${user.loginMethod.method} to log in.`);
                }
                return user;
            }

            if (user.status === 'active') {
                if (user.loginMethod.method !== provider) {
                    throw new BadRequestException(`This email is already registered with ${user.loginMethod.method}. Please use ${user.loginMethod.method} to log in.`);
                }
                return user;
            }

            throw new BadRequestException('Your account is not active. Please contact support.');
        } else {
            return this.createUser(createUserDto, isSsoLogin, provider);
        }
    }

    async createUser(createUserDto: CreateUserDto, isSsoLogin: boolean = true, loginProvider: string): Promise<User> {
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
            isSurveyComplete: false
        });
        return newUser.save();
    }

    async updateUser(userId: string | Types.ObjectId, updateUserDto: any): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(
            userId,
            updateUserDto,
            { new: true }
        ).exec();

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }

    async findOneById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findByEmailforPassword(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).select('+loginMethod.password').exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getUserModels(
        userId: string,
        filterModelDto: FilterModelDto
    ): Promise<Model[]> {
        const user = await this.findOneById(userId)
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        const modelIds = user.models;
        if (modelIds.length === 0) {
            return [];
        }
        const filter: any = { ...filterModelDto, _id: { $in: modelIds } };

        const models = await this.modelService.getFilteredModels(filter)
        return models;
    }


    async setProfileImg(userId: string, modelId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        const modelObjectId = new Types.ObjectId(modelId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        if (!user.models.includes(modelObjectId)) {
            throw new BadRequestException(`Model with ID ${modelId} does not belong to the user`);
        }

        const modeldoc = await this.modelService.getModelById(modelId)

        return this.updateUser(userId, { profileImg: modeldoc.preview })
    }


    async toggleLikeModel(userId: string, modelId: string): Promise<Model> {
        const user = await this.userModel.findById(userId);
        const modelObjectId = new Types.ObjectId(modelId);

        if (user.likedModels.includes(modelObjectId)) {
            await this.userModel.findByIdAndUpdate(userId, {
                $pull: { likedModels: modelObjectId },
            });

            return this.modelService.unlikeModel(modelId)
        } else {
            await this.userModel.findByIdAndUpdate(userId, {
                $addToSet: { likedModels: modelObjectId },
            });

            return this.modelService.likeModel(modelId)
        }
    }

    async deductCredits(userId: string, amount: number): Promise<User> {
        const user = await this.findOneById(userId);

        const updatedUser = await this.updateUser(userId, { credits: user.credits - amount });
        return updatedUser;
    }

    async addCredits(userId: string, amount: number): Promise<User> {
        const user = await this.findOneById(userId);

        const updatedUser = await this.updateUser(userId, { credits: user.credits + amount });

        return updatedUser;
    }

    async completeSurvey(userId: string, surveyDto: SurveyDto): Promise<User> {
        const updateUserDto: UpdateUserDto = {
            survey: surveyDto,
            status: 'active',
            isSurveyCompleted: true
        };

        const user = await this.updateUser(userId, updateUserDto);
        if (user.status === 'active' && user.isSurveyCompleted) {
            await this.addCredits(userId, 250);
            return user;
        } else {
            return null;
        }
    }

}
