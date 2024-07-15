import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateModelDto } from 'src/models/dto/create-model.dto';
import { ModelsService } from 'src/models/models.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly modelService: ModelsService) { }

    async findOrCreateUser(createUserDto: CreateUserDto): Promise<User> {
        const { address } = createUserDto;
        let user = await this.userModel.findOne({ address }).exec();
        if (!user) {
            user = new this.userModel({
                address
            });
            await user.save();
        }
        return user;
    }

    async findOneById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }
}
