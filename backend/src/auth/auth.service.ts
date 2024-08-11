import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user: any): Promise<{ access_token: string }> {
        const createUserDto: CreateUserDto = {
            username: user.firstName + ' ' + user.lastName,
            email: user.email,
            profileImg: user.photo
        };
        const userData = await this.usersService.findOrCreateUser(createUserDto);

        if (!userData) {
            throw new Error('User authentication failed.');
        }
        const payload = { email: userData.email, sub: userData._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
