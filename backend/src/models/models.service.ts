import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateModelDto } from './dto/create-model.dto';
import { FilterModelDto } from './dto/filter-model.dto';
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

    //내부 함수 (백엔드 내에서만 굴러가는 함수) -> 유저 모델 필터링 기능.
    async getFilteredModels(filter: any): Promise<Model[]> {
        const limit = parseInt(filter.limit, 10) || 10;
        const offset = parseInt(filter.offset, 10) || 0;

        // 불필요한 필드를 제거해서 쿼리 필터로 사용
        delete filter.limit;
        delete filter.offset;

        return this.modelModel
            .find(filter)
            .sort({ [filter.sortBy || 'createdAt']: filter.sortOrder === 'asc' ? 1 : -1 })
            .skip(offset)
            .limit(limit)
            .exec();
    }

    //Api 호출용 함수, 마켓과 같은 퍼블릭에서 사용되는 기능
    async getFilterPublicModels(filterModelDto: FilterModelDto): Promise<Model[]> {
        const { sortBy = 'createdAt', sortOrder = 'desc', offset = 0, limit = 10 } = filterModelDto;

        const filter: any = {
            visibility: 'public',
        };

        return this.modelModel
            .find(filter)
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip(Number(offset))
            .limit(Number(limit))
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
