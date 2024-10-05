import { Injectable, ArgumentsHost } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model as MongooseModel, Types } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { CreateModelDto } from './dto/create-model.dto';
import { FilterModelDto } from './dto/filter-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './schema/model.schema';
import { HttpErrorException } from '../common/exceptions/http-error.exception.ts';
import {
  MODEL_NOT_FOUND,
  FORBIDDEN_ACTION,
  INTERNAL_SERVER_ERROR,
} from 'src/common/exceptions/error.code';

@Injectable()
export class ModelsService {
  constructor(
    @InjectModel(Model.name) private readonly modelModel: MongooseModel<Model>,
    @InjectModel(User.name) private readonly userModel: MongooseModel<User>,
  ) {}

  async createModel(createModelDto: CreateModelDto, userId: string) {
    try {
      const createdModel = new this.modelModel({
        ...createModelDto,
        createdBy: new Types.ObjectId(userId),
      });
      const savedModel = await createdModel.save();

      await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { models: savedModel._id } },
        { new: true },
      );

      return savedModel;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async updateModel(
    userId: string,
    id: string,
    updateModelDto: UpdateModelDto,
    host?: ArgumentsHost,
  ): Promise<Model> {
    await this.validateModelOwnership(userId, id, host);
    try {
      return this.modelModel
        .findByIdAndUpdate(id, updateModelDto, { new: true })
        .exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async deleteModel(
    userId: string,
    id: string,
    host?: ArgumentsHost,
  ): Promise<Model> {
    await this.validateModelOwnership(userId, id, host);
    try {
      const deletedModel = await this.modelModel.findByIdAndDelete(id).exec();
      await this.userModel
        .updateOne({ _id: deletedModel.createdBy }, { $pull: { models: id } })
        .exec();

      return deletedModel;
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async getFilteredModels(filter: any, host?: ArgumentsHost): Promise<Model[]> {
    try {
      const limit = parseInt(filter.limit, 10) || 10;
      const offset = parseInt(filter.offset, 10) || 0;

      delete filter.limit;
      delete filter.offset;

      return await this.modelModel
        .find(filter)
        .sort({
          [filter.sortBy || 'createdAt']: filter.sortOrder === 'asc' ? 1 : -1,
        })
        .skip(offset)
        .limit(limit)
        .exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async getFilterPublicModels(
    filterModelDto: FilterModelDto,
    host?: ArgumentsHost,
  ): Promise<Model[]> {
    try {
      const {
        sortBy = 'createdAt',
        sortOrder = 'desc',
        offset = 0,
        limit = 10,
      } = filterModelDto;

      const filter: any = {
        visibility: 'public',
      };

      return await this.modelModel
        .find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(Number(offset))
        .limit(Number(limit))
        .exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR, host);
    }
  }

  async likeModel(id: string): Promise<Model> {
    try {
      return this.modelModel
        .findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })
        .exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async unlikeModel(id: string): Promise<Model> {
    try {
      return this.modelModel
        .findByIdAndUpdate(id, { $inc: { like: -1 } }, { new: true })
        .exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async getAllModels(offset: number, limit: number): Promise<Model[]> {
    try {
      return this.modelModel.find().skip(offset).limit(limit).exec();
    } catch (error) {
      throw new HttpErrorException(INTERNAL_SERVER_ERROR);
    }
  }

  async getModelById(id: string): Promise<Model> {
    const model = await this.modelModel.findById(id).exec();
    if (!model) {
      throw new HttpErrorException(MODEL_NOT_FOUND);
    }
    return model;
  }

  private async validateModelOwnership(
    userId: string,
    modelId: string,
    host?: ArgumentsHost,
  ): Promise<Model> {
    const model = await this.modelModel.findById(modelId).exec();
    if (!model) {
      throw new HttpErrorException(MODEL_NOT_FOUND, host);
    }
    if (model.createdBy.toString() !== userId) {
      throw new HttpErrorException(FORBIDDEN_ACTION, host);
    }
    return model;
  }
}
