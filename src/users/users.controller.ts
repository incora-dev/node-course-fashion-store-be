import { Controller, Get, Post, Body, HttpStatus, HttpException, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import {succesfulCreating, existingEmail} from '../constants/user-responses'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post()
    @ApiResponse({ status: 201, description: succesfulCreating})
    @ApiResponse({ status: HttpStatus.FOUND, description: existingEmail})
	async create(@Body() createUser: CreateUserDto){
        return await this.usersService.create(createUser);
    }

    @Put('change-password')
    async changePassword(@Body() password: ChangePasswordDto): Promise<string>{
        return this.usersService.changePassword(password);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers(): Promise<IUser[]> {
      return this.usersService.getUsers();
    };

    @Get(':id')
    async getById(@Param('id') id: string): Promise<IUser>{
        return await this.usersService.getById(id);
    }
    
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateUser: UpdateUserDto): Promise<IUser>{
		return await this.usersService.update(id, updateUser);
	}

	@Delete(':id')
	async delete(@Param('id') id:string){
		return await this.usersService.delete(id);
	}
}
