import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOrCreateUser(createUserDto: CreateUserDto): Promise<User> {
        const { address, plan, profileImg, username, assets } = createUserDto;
        let user = await this.userModel.findOne({ address }).exec();
        if (!user) {
            user = new this.userModel({
                address,
                plan,
                profileImg,
                username,
                assets,
            });
            await user.save();
        }
        return user;
    }

    async findOneById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }
}
