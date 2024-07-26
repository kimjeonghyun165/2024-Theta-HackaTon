import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateModelDto } from './dto/create-model.dto';
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
