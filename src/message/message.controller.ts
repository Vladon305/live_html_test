import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PusherService } from 'src/pusher/pusher.service';

@Controller('dialog')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private pusherService: PusherService,
  ) {}

  @Post(':dialogId/message')
  async create(
    @Param('dialogId') dialogId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const message = this.messageService.create(dialogId, createMessageDto);
    await this.pusherService.trigger('chat', 'message', message);
    return message;
  }

  @Get(':dialogId/message')
  findAll(@Param('dialogId') dialogId: string) {
    return this.messageService.findAll(dialogId);
  }

  @Get(':dialogId/message/:messageId')
  findOne(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.findOne(dialogId, messageId);
  }

  @Patch(':dialogId/message/:messageId')
  update(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(dialogId, messageId, updateMessageDto);
  }

  @Delete(':dialogId/message/:messageId')
  remove(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.remove(dialogId, messageId);
  }
}
