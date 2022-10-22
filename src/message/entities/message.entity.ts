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
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => Dialog, (dialog) => dialog.messages)
  @JoinColumn()
  dialog: Dialog;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn()
  user: User;
}
