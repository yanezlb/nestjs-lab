import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    createUser(user: CreateUserDto){
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    getUsers() {
        return this.usersRepository.find();
    }   

    getUser(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    deleteUser(id: number): Promise<DeleteResult> {
        return this.usersRepository.delete(id);
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<User | null> {
        await this.usersRepository.update({ id }, userData);
        return this.usersRepository.findOne({ where: { id } });
    }
}
