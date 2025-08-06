import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async createUser(user: CreateUserDto) {
        const userFound = await this.usersRepository.findOne({ where: { username: user.username } });

        if (userFound) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    getUsers() {
        return this.usersRepository.find();
    }   

    async getUser(id: number): Promise<User | null> {
        const userFound = await this.usersRepository.findOne({ where: { id } });
        if(!userFound){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }
        return userFound;
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update({ id }, userData);
        return this.usersRepository.findOne({ where: { id } });
    }
}
