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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './entities/message.entity';

@ApiTags('Сообщения')
@Controller('dialogs')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private pusherService: PusherService,
  ) {}

  @ApiOperation({ summary: 'Создание сообщения' })
  @ApiResponse({ status: 200, type: Message })
  @Post(':dialogId/messages')
  async create(
    @Param('dialogId') dialogId: string,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messageService.create(
      dialogId,
      createMessageDto,
    );
    await this.pusherService.trigger('chat', 'message', message);
    return message;
  }

  @ApiOperation({ summary: 'Получение всех сообщений' })
  @ApiResponse({ status: 200, type: [Message] })
  @Get(':dialogId/messages')
  findAll(@Param('dialogId') dialogId: string) {
    return this.messageService.findAll(dialogId);
  }

  @ApiOperation({ summary: 'Получить одно сообщение' })
  @ApiResponse({ status: 200, type: Message })
  @Get(':dialogId/messages/:messageId')
  findOne(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.findOne(dialogId, messageId);
  }

  @ApiOperation({ summary: 'Изменить сообщение' })
  @ApiResponse({ status: 200, type: Message })
  @Patch(':dialogId/messages/:messageId')
  update(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messageService.update(dialogId, messageId, updateMessageDto);
  }

  @ApiOperation({ summary: 'Удалить сообщение' })
  @ApiResponse({ status: 200, type: Message })
  @Delete(':dialogId/messages/:messageId')
  remove(
    @Param('dialogId') dialogId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.messageService.remove(dialogId, messageId);
  }
}
