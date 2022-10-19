import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';
import { Dialog } from './entities/dialog.entity';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(Dialog)
    private dialogRepository: Repository<Dialog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: any, createDialogDto: CreateDialogDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        'User not found. Cannot create dialog',
        HttpStatus.BAD_REQUEST,
      );
    }
    const dialog = this.dialogRepository.create({
      ...createDialogDto,
      users: [user],
    });
    user.dialogs.push(dialog);

    this.userRepository.save(user);
    return this.dialogRepository.save(dialog);
  }

  findAll() {
    return this.dialogRepository.find({ relations: ['users'] });
  }

  findOne(id: any) {
    return this.dialogRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  update(id: any, updateDialogDto: UpdateDialogDto) {
    return this.dialogRepository.update(id, updateDialogDto);
  }

  remove(id: any) {
    return this.dialogRepository.delete(id);
  }

  async addUser(dialogId: any, userId: any) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const userWithDialog = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['dialogs'],
    });
    const dialog = await this.dialogRepository.findOne({
      where: { id: dialogId },
    });
    const dialogWithUser = await this.dialogRepository.findOne({
      where: { id: dialogId },
      relations: ['users'],
    });

    if (!user || !dialog || !userWithDialog || !dialogWithUser) {
      throw new HttpException(
        'User or dialog not found. Cannot add user to dialog',
        HttpStatus.BAD_REQUEST,
      );
    }

    userWithDialog.dialogs.push(dialog);
    this.userRepository.save(userWithDialog);
    dialogWithUser.users.push(user);
    return this.dialogRepository.save(dialogWithUser);
  }
}
