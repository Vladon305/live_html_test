import { ApiProperty } from '@nestjs/swagger';
import { Dialog } from 'src/dialog/entities/dialog.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Message {
  @ApiProperty({ example: '1', description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  @Column()
  message: string;

  @ApiProperty({
    type: () => Dialog,
    example: '[Role1, Role2]',
    description: 'Массив диалогов сообщения',
  })
  @ManyToOne(() => Dialog, (dialog) => dialog.messages)
  @JoinColumn()
  dialog: Dialog;

  @ApiProperty({
    type: () => User,
    example: 'user',
    description: 'Пользователь отправивший сообщение',
  })
  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn()
  user: User;
}
