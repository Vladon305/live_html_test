import { ApiProperty } from '@nestjs/swagger';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Dialog {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Chat 1', description: 'Название диалога' })
  @Column()
  name: string;

  @ApiProperty({
    example: '[user1, user2]',
    description: 'Массив пользователей диалога /тестовое, не используется',
  })
  @ManyToMany(() => User, (user) => user.dialogs)
  users: User[];

  @ApiProperty({
    example: '[message1, message2]',
    description: 'Массив сообщений диалога',
  })
  @OneToMany(() => Message, (message) => message.dialog)
  messages: Message[];
}
