import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile> 
    ) {}

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

    async deleteUser(id: number): Promise<DeleteResult> {
        const result = await this.usersRepository.delete({ id });
        if(result.affected === 0){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }
        return this.usersRepository.delete(id);
    }

    async updateUser(id: number, userData: UpdateUserDto): Promise<User | null> {
        const userFound = await this.usersRepository.findOne({
            where:{
                id
            }
        })

        if(!userFound){
            throw new HttpException("user not found", HttpStatus.NOT_FOUND);
        }

        const updateUser = Object.assign(userFound, userData)

        return  this.usersRepository.save(updateUser);
    }

    async createProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.usersRepository.findOne({
            where: {
                id,
            }
        });

        if(!userFound){
            return new HttpException("user not found", HttpStatus.NOT_FOUND);
        }


        const newProfile = this.profileRepository.create(profile);
        const savedProfile = await this.profileRepository.save(newProfile);
        userFound.profile = savedProfile

        return this.usersRepository.save(userFound);

    }
}
