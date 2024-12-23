import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUsers } from '../models/users.model';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() user: IUsers): Promise<IUsers> {
        return this.usersService.create(user);
    }

    @Get()
    async findAll(): Promise<IUsers[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IUsers> {
        return this.usersService.findOne(id);
    }

    @Put(':id') 
    async update(@Body() user: IUsers, @Param('id') id: string): Promise<IUsers> {
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<IUsers> {
        return this.usersService.remove(id);
    }
    
}
