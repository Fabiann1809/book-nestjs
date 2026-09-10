import { Controller, Get, Param } from '@nestjs/common';

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
        const data = this.users.find((user)=> user.id === id);
        console.log('.:: data:', data);
        if(data === undefined){
            return{
                msg: 'No existe el ID',
                data
            }
        }
        return {
            msg: 'Usuario encontrado',
            data
        };
    }
    @Get('search/:name')
    getUserbyName(@Param('name') name: string){
        const data = this.users.find((user)=> user.name === name);
        if(!data) {
            return{
                msg: 'Nombre no encontrado'
            }
        }
        return {
            data: data?.email
        };
    }

}   

