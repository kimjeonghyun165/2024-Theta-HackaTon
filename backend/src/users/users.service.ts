import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOrCreateUser(address: string): Promise<User> {
        let user = await this.userModel.findOne({ address }).exec();
        if (!user) {
            user = new this.userModel({ address });
            await user.save();
        }
        return user;
    }

    async findOneById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }
}