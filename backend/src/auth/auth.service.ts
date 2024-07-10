import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import Web3 from 'web3';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
    private web3: Web3;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
        this.web3 = new Web3();
    }

    async validateUser(address: string, signature: string, message: string): Promise<any> {
        const recoveredAddress = this.web3.eth.accounts.recover(message, signature);
        if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
            const user = await this.usersService.findOrCreateUser(address);
            return user;
        }
        return null;
    }

    async login(createUserDto: CreateUserDto) {
        const user = await this.validateUser(createUserDto.address, createUserDto.signature, createUserDto.message);
        if (!user) {
            throw new Error('Invalid signature');
        }
        const payload = { sub: user._id, address: user.address };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
