import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

interface User {
    id: string;
    name: string;
    email: string;}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: '1',
            name: 'John',
            email: 'john@example.com'
        },
        {
            id: '2',
            name: 'Jane',
            email: 'jane@example.com'
        },
        {
            id: '3',
            name: 'Michael',
            email: 'michael@example.com'
        },
        {
            id: '4',
            name: 'Emily',
            email: 'emily@example.com'
        },
        {
            id: '5',
            name: 'Robert',
            email: 'robert@example.com'
        },
        {
            id: '6',
            name: 'Olivia',
            email: 'olivia@example.com'
        },
        {
            id: '7',
            name: 'William',
            email: 'william@example.com'
        },
        {
            id: '8',
            name: 'Sophia',
            email: 'sophia@example.com'
        },
        {
            id: '9',
            name: 'James',
            email: 'james@example.com'
        },
        {
            id: '10',
            name: 'Ava',
            email: 'ava@example.com'
        }
    ]
    @Get()
    getUsers(): User[] {
        return this.users;
    }
    @Get(':id')
    getUserByid(@Param('id')id: string) {
        console.log('.:: UserID', id);
        const user = this.users.find((user)=> user.id === id);
        console.log('.:: data:', user);
        if(user === undefined){
            // simulacion de usuario no encontrado; error 404
            throw new NotFoundException('usuario con id ' + id + ' no existe');
        }
    }
    @Get('search/:name')
    getUserbyName(@Param('name') name: string){
        const data = this.users.find((user)=> user.name === name);
        if(!data) {
    // simulacion de  nombre de usuario no encontrado; error 404
            throw new NotFoundException('usuario con nombre ' + name + ' no existe');
        }
        return {
            data: data?.email
        };
    }
    @Post()
    createUser(@Body() userPayload: CreateUserDto) {
        console.log('.:: user:', userPayload)
        const newUser = {
            ...userPayload,
            id: `${new Date().getTime()}`, 
        }
        this.users.push(newUser);
        return {
            msg: 'Usuario creado correctamente',
            data: newUser
        };
        // // valido que el corro no este vacio
        // if(userPayload.email.trim()=== ""){
        //     throw new BadRequestException('El correo no puede estar vacio');
        // }
        // //valido que el correo tiene el formato correcto
        // if(userPayload.email.includes("@") === false ){
        //     throw new BadRequestException('El correo ' + userPayload.email +'  no tiene el formato correcto');
        // }
    }
    @Delete(':id')
    deletedeleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user)=> user.id === id);
        if (position === -1){
              // simulacion de usuario no encontrado; error 404
            throw new NotFoundException('usuario con id ' + id + ' no existe');
        }
        this.users.splice(position, 1)
        return {
            msg: 'Usuario eliminado correctamente'
        }
    }
    @Put(":id")
    updateUser(@Param("id") id: string, @Body() changes: User) {
        console.log(".:: ID usuario: ", id);
        console.log(".:: Cambios: ", changes);

        const position = this.users.findIndex((user) => user.id === id);
        if (position === -1) {
            // simulacion de usuario no encontrado; error 404
            throw new NotFoundException('usuario con id ' + id + ' no existe');
        }
        const currentData = this.users[position];
        const updateUser = {
            ...currentData,
            ...changes
        };

        this.users[position] = updateUser;

        return {
            msg: "Usuario actualizado",
            data: updateUser
        };
    }
}   

