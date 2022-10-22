import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dialog } from 'src/dialog/entities/dialog.entity';
import { User } from 'src/user/entities/user.entity';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dialogId: any, createMessageDto: CreateMessageDto) {
    const dialog = await this.dialogRepository.findOneBy({ id: dialogId });
    const dialogWithMessages = await this.dialogRepository.findOne({
      where: { id: dialogId },
      relations: ['messages'],
    });
    const user = await this.userRepository.findOneBy({
      id: createMessageDto.userId,
    });
    if (!dialog || !dialogWithMessages || !user) {
      throw new HttpException(
        'Dialog not found. Cannot create message',
        HttpStatus.BAD_REQUEST,
      );
    }
    const message = await this.messageRepository.save(
      this.messageRepository.create({
        ...createMessageDto,
        dialog,
        user,
      }),
    );
    dialogWithMessages.messages.push(message);
    this.dialogRepository.save(dialogWithMessages);

    return message;
  }

  findAll(id: any) {
    return this.messageRepository.find({
      where: { dialog: { id } },
      relations: ['user', 'dialog'],
    });
  }

  findOne(dialogId: any, messageId: any) {
    return this.messageRepository.findOne({
      where: {
        dialog: { id: dialogId },
        id: messageId,
      },
      relations: ['user', 'dialog'],
    });
  }

  update(dialogId: any, messageId: any, updateMessageDto: UpdateMessageDto) {
    this.messageRepository.update(
      { dialog: { id: dialogId }, id: messageId },
      updateMessageDto,
    );
    return this.dialogRepository.findOne({
      where: { id: messageId },
      relations: ['user', 'dialog'],
    });
  }

  remove(dialogId: any, messageId: any) {
    return this.messageRepository.delete({
      dialog: { id: dialogId },
      id: messageId,
    });
  }
}
