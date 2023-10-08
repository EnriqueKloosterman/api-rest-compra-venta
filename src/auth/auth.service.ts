import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import * as bcryptjs from 'bcryptjs';



@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService){}

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
        return { message: 'User created successfully' };
    }
    
    
}
