import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';





@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService 
        ) {}

    async register({ name, last_name, business_name, email, phone, password }: RegisterDto){
        const user = await this.userService.findOneByEmail(email);

        if(user){
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        await this.userService.create({ 
            name,
            last_name,
            business_name,
            email,
            phone,
            password: hashedPassword 
        });
        return { 
            name,
            last_name,
            business_name,
            email,
            phone
            // message: 'User created successfully' };
        }
    }

    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email);

        if(!user){
            throw new BadRequestException('Wrong email');
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);

        if(!passwordMatch){
            throw new BadRequestException('Wrong password');
        }

        const payload = { email: user.email}
        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user: user.email,
            // message: 'User logged in successfully'
         };
    
    }
    
    
}
