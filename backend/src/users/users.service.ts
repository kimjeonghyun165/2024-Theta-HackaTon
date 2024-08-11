import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import { FilterModelDto } from 'src/models/dto/filter-model.dto';
import { ModelsService } from 'src/models/models.service';
import { Model } from 'src/models/schema/model.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: MongooseModel<User>,
        private readonly modelService: ModelsService) { }

    async findOrCreateUser(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, profileImg } = createUserDto;
        let user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            user = new this.userModel({
                username,
                email,
                profileImg
            });
            await user.save();
        } else {
            user.username = username;
            user.profileImg = profileImg;
            await user.save();
        }
        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        return user;
    }

    async findOneById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }

    async getUserModels(
        userId: string,
        filterModelDto: FilterModelDto
    ): Promise<Model[]> {
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        const modelIds = user.models;

        const filter: any = { ...filterModelDto, _id: { $in: modelIds } };

        const models = await this.modelService.getFilteredModels(filter)

        return models;
    }


    async setRepresentativeModel(userId: string, modelId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        const modelObjectId = new Types.ObjectId(modelId);

        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        if (!user.models.includes(modelObjectId)) {
            throw new BadRequestException(`Model with ID ${modelId} does not belong to the user`);
        }

        const modeldoc = await this.modelService.getModelById(modelId)

        return this.updateUser(userId, { representativeModel: modeldoc.preview })
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
}
