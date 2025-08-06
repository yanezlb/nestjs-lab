import { Controller, Post,  Get,  Body, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    createUser( @Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto);
    }
    
    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        console.log(`Fetching user with ID: ${id}`);
        return this.usersService.getUser(id);
    }

    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        console.log(`Deleting user with ID: ${id}`);
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto) {
           console.log(`Updating user with ID: ${id}`);
           return this.usersService.updateUser(id, updateUserDto);
    }

    @Post(':id/profile')
    createProfile(
        @Param('id', ParseIntPipe) id: number, 
        @Body() createProfileDto: CreateProfileDto
    ){
        return this.usersService.createProfile(id, createProfileDto)
    }
}
