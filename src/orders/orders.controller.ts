import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';


enum PayMethod {
    Cash = 'CASH',
    Credit = 'CREDIT',
    CreditCard = 'CREDIT_CARD',
}
interface Order {
    id: string;
    product: string;
    quantity: number;
    price: number;
    payMethod: PayMethod;
}
@Controller('orders')
export class OrdersController {
    private orders: Order[] = [
        {
        id: '1',
        product: 'Libro de programación',
        quantity: 1,
        price: 30,
        payMethod: PayMethod.Cash
        },
        {
        id: '2',
        product: 'Cuaderno',
        quantity: 2,
        price: 45,
        payMethod: PayMethod.Credit
        },
        {
        id: '3',
        product: 'Lapicero',
        quantity: 1,
        price: 25,
        payMethod: PayMethod.Cash
        },
        {
        id: '4',
        product: 'Bolso',
        quantity: 3,
        price: 20,
        payMethod: PayMethod.CreditCard
        },
        {
        id: '5',
        product: 'Computador',
        quantity: 1,
        price: 40, 
        payMethod: PayMethod.Credit
        }
    ]
    @Get()
    getOrder(): Order[] {
        return this.orders;
    }
    @Get(':id')
    getOrderById(@Param('id')id: string){
        console.log('.:: OrderID', id);
        const data = this.orders.find((order)=> order.id === id)
        console.log('.:: data:', data);
        if(!data) {
            return{
                msg: 'No existe el ID',
            }
        }
        return {
            msg: 'Pedido encontrado',
            data
        }
    } 
    @Get('search/:payMethod')
    getOrderByPayMethod(@Param('payMethod') payMethod: PayMethod){
        if (!Object.values(PayMethod).includes(payMethod)) {
        return {
            msg: 'Método de pago no válido',
            availableMethods: Object.values(PayMethod)
        };
    }
        const data = this.orders.filter((order)=> order.payMethod === payMethod);
    return {
            payMethod,
            data
        }    
    };

    @Post()
    createOrder(@Body()order: Order){
        console.log('.:: order', order);
        this.orders.push(order);
        return {
            msg: 'pedido creado correctamente',
            order
        }
    }
    @Delete(':id')
    deleteOrder(@Param('id') id : string){
        const position = this.orders.findIndex((order)=> order.id === id);
        if(position === -1){
            return{
                msg: 'No existe el ID de pedido'
            }
        }
        this.orders.splice(position, 1);
        return {
            msg: 'Pedido eliminado correctamente'
        }
    }
        
}

