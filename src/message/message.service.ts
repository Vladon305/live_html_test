import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dialog } from 'src/dialog/entities/dialog.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Dialog)
    private dialogRepository: Repository<Dialog>,
  ) {}

  async create(dialogId: any, createMessageDto: CreateMessageDto) {
    const dialog = await this.dialogRepository.findOne({
      where: { id: dialogId },
      relations: ['messages'],
    });
    if (!dialog) {
      throw new HttpException(
        'Dialog not found. Cannot create message',
        HttpStatus.BAD_REQUEST,
      );
    }
    const message = await this.messageRepository.save(
      this.messageRepository.create(createMessageDto),
    );
    dialog.messages.push(message);
    this.dialogRepository.save(dialog);
    return message;
  }

  findAll(id: any) {
    return this.messageRepository.findBy({ dialog: { id } });
  }

  findOne(dialogId: any, messageId: any) {
    return this.messageRepository.findOneBy({
      dialog: { id: dialogId },
      id: messageId,
    });
  }

  update(dialogId: any, messageId: any, updateMessageDto: UpdateMessageDto) {
    return this.messageRepository.update(
      { dialog: { id: dialogId }, id: messageId },
      updateMessageDto,
    );
  }

  remove(dialogId: any, messageId: any) {
    return this.messageRepository.delete({
      dialog: { id: dialogId },
      id: messageId,
    });
  }
}
