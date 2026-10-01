import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { get } from 'http';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get('')
    getAllUsers(){
        return this.userService.findAll()
    }
    @Get('search/:name')
    getUserbyName(@Param('name') name: string){
        return this.userService.search(name)
    }
    @Get(':id')
    getUserByid(@Param('id')id: string) {
        return this.userService.findById(id);
    }
    @Post()
    createUser(@Body() userPayload: CreateUserDto) {
        return this.userService.create(userPayload);
    }
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.delete(id);
    }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() changes: UpdateUserDto) {
        return this.userService.update(id, changes);
    }
 }   

