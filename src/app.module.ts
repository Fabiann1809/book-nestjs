import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { OrdersController } from './orders/orders.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
