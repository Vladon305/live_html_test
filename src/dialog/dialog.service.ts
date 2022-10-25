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

  async create(userId: string, createDialogDto: CreateDialogDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const userWithDialogs = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['dialogs'],
    });
    if (!user || !userWithDialogs) {
      throw new HttpException(
        'User not found. Cannot create dialog',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newDialog = await this.dialogRepository.save(
      this.dialogRepository.create({
        ...createDialogDto,
        users: [user],
      }),
    );

    const dialog = await this.dialogRepository.findOneBy({
      id: newDialog.id,
    });
    userWithDialogs.dialogs.push(dialog);
    this.userRepository.save(userWithDialogs);
    console.log(newDialog);

    return this.dialogRepository.findOne({
      where: { id: newDialog.id },
      relations: ['users', 'messages'],
    });
  }

  findAll() {
    return this.dialogRepository.find({ relations: ['users', 'messages'] });
  }

  findOne(id: string) {
    return this.dialogRepository.findOne({
      where: { id },
      relations: ['users', 'messages'],
    });
  }

  update(id: string, updateDialogDto: UpdateDialogDto) {
    this.dialogRepository.update(id, updateDialogDto);
    return this.dialogRepository.findOne({
      where: { id },
      relations: ['users', 'messages'],
    });
  }

  async remove(id: string) {
    const users = await this.userRepository.find({
      where: { dialogs: { id } },
      relations: ['dialogs'],
    });
    users.forEach((user) => {
      user.dialogs = user.dialogs.filter((dialog) => dialog.id !== id);
    });
    this.userRepository.save(users);
    return this.dialogRepository.delete(id);
  }

  async addUser(dialogId: string, userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const userWithDialogs = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['dialogs'],
    });
    const dialog = await this.dialogRepository.findOne({
      where: { id: dialogId },
    });
    const dialogWithUsers = await this.dialogRepository.findOne({
      where: { id: dialogId },
      relations: ['users', 'messages'],
    });

    if (!user || !dialog || !userWithDialogs || !dialogWithUsers) {
      throw new HttpException(
        'User or dialog not found. Cannot add user to dialog',
        HttpStatus.BAD_REQUEST,
      );
    }

    userWithDialogs.dialogs.push(dialog);
    this.userRepository.save(userWithDialogs);
    dialogWithUsers.users.push(user);
    this.dialogRepository.save(dialogWithUsers);
    return this.dialogRepository.findOne({
      where: { id: dialogId },
      relations: ['users', 'messages'],
    });
  }
}
