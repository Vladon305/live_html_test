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
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  ava: string;

  @ManyToMany(() => Dialog, (dialog) => dialog.users, { cascade: true })
  @JoinTable()
  dialogs: Dialog[];

  @OneToMany(() => Message, (message) => message.user, { cascade: true })
  messages: Message[];
}
