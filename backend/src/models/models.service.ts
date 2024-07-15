import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './schema/model.schema';

@Injectable()
export class ModelsService {

    constructor(
        @InjectModel('Model') private readonly modelModel: MongooseModel<Model>,
        @InjectModel('User') private readonly userModel: MongooseModel<User>,
    ) { }

    async createModel(createModelDto: CreateModelDto, userId: string) {
        const createdModel = new this.modelModel(createModelDto);
        const savedModel = await createdModel.save();

        await this.userModel.findByIdAndUpdate(
            userId,
            { $push: { models: savedModel._id } },
            { new: true }
        );

        return savedModel;
    }

    async getAllModels(offset: number, limit: number): Promise<Model[]> {
        return this.modelModel
            .find()
            .skip(offset)
            .limit(limit)
            .exec();
    }

    async getModelById(id: string): Promise<Model> {
        return this.modelModel.findById(id).exec();
    }
}
