import { Dialog } from 'src/dialog/entities/dialog.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
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
}
