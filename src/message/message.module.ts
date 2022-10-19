import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { PusherModule } from 'src/pusher/pusher.module';
import { Dialog } from 'src/dialog/entities/dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Dialog]), PusherModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
