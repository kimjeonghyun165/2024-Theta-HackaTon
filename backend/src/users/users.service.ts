import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelsService } from 'src/models/models.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
