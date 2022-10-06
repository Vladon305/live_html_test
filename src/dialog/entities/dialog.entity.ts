import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Dialog {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.dialog)
  users: User[];

  @OneToMany(() => Message, (message) => message.dialog)
  messages: Message[];
}
