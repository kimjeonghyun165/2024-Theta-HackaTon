import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './schema/model.schema';

@Injectable()
export class ModelsService {

    constructor(
        @InjectModel(Model.name) private readonly modelModel: MongooseModel<Model>,
        @InjectModel(User.name) private readonly userModel: MongooseModel<User>,
    ) { }

    async createModel(createModelDto: CreateModelDto, userId: string) {
        const createdModel = new this.modelModel({ ...createModelDto, createdBy: new Types.ObjectId(userId) });
        const savedModel = await createdModel.save();

        await this.userModel.findByIdAndUpdate(
            userId,
            { $push: { models: savedModel._id } },
            { new: true }
        );

        return savedModel;
    }


    async updateModel(userId: string, id: string, updateModelDto: UpdateModelDto): Promise<Model> {
        const existingModel = await this.modelModel.findById(id).exec();
        if (!existingModel) {
            throw new NotFoundException('Model not found');
        }
        if (existingModel.createdBy.toString() !== userId) {
            throw new ForbiddenException('You are not allowed to update this model');
        }
        const { ...updateData } = updateModelDto;

        return this.modelModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }


    async deleteModel(userId: string, id: string): Promise<Model> {
        const deletedModel = await this.modelModel.findByIdAndDelete(id).exec();
        if (deletedModel.createdBy.toString() !== userId) {
            throw new ForbiddenException('You are not allowed to delete this model');
        }
        if (deletedModel) {
            await this.userModel.updateOne(
                { _id: deletedModel.createdBy },
                { $pull: { models: id } }
            ).exec();
        }

        return deletedModel;
    }

    async getFilteredModels(query: {
        createdBy?: string;
        visibility?: 'private' | 'public';
        sortBy?: 'createdAt' | 'like';
        sortOrder?: 'asc' | 'desc';
        offset?: number;
        limit?: number;
    }): Promise<Model[]> {
        const { createdBy, visibility, sortBy = 'createdAt', sortOrder = 'desc', offset = 0, limit = 10 } = query;

        const filter: any = {};
        if (createdBy) {
            filter.createdBy = new Types.ObjectId(createdBy);
        }
        if (visibility) {
            filter.visibility = visibility;
        }

        return this.modelModel
            .find(filter)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async likeModel(id: string): Promise<Model> {
        return this.modelModel.findByIdAndUpdate(
            id,
            { $inc: { like: 1 } },
            { new: true }
        ).exec();
    }

    async unlikeModel(id: string): Promise<Model> {
        return this.modelModel.findByIdAndUpdate(
            id,
            { $inc: { like: -1 } },
            { new: true }
        ).exec();
    }

    async getAllModels(offset: number, limit: number): Promise<Model[]> {
        const models = await this.modelModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
        return models;
    }

    async getModelById(id: string): Promise<Model> {
        return this.modelModel.findById(id).exec();
    }
}
