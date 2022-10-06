import { Dialog } from 'src/dialog/entities/dialog.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  ava: string;

  @Column({ default: true })
  isSubscribe: boolean;

  @ManyToOne(() => Dialog, (dialog) => dialog.users)
  dialog: Dialog;
}
