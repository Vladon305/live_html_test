import { ApiProperty } from '@nestjs/swagger';
import { Dialog } from 'src/dialog/entities/dialog.entity';
import { Message } from 'src/message/entities/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'qer93u19198r.svg',
    description: 'Название фотографии пользователя',
  })
  @Column()
  ava: string;

  @ApiProperty({
    example: '[dialog1, dialog2]',
    description: 'Массив диалогов пользователя',
  })
  @ManyToMany(() => Dialog, (dialog) => dialog.users, { cascade: true })
  @JoinTable()
  dialogs: Dialog[];

  @ApiProperty({
    example: '[message1, message2]',
    description: 'Массив сообщений пользователя',
  })
  @OneToMany(() => Message, (message) => message.user, { cascade: true })
  messages: Message[];
}
