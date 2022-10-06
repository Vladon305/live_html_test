import { Dialog } from 'src/dialog/entities/dialog.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  message: string;

  @OneToOne(() => Dialog, (dialog) => dialog.messages)
  @JoinColumn()
  dialog: Dialog;
}
