import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';
import { Dialog } from './entities/dialog.entity';

@Injectable()
export class DialogService {
  constructor(
    @InjectRepository(Dialog)
    private dialogRepository: Repository<Dialog>,
  ) {}

  create(createDialogDto: CreateDialogDto) {
    return this.dialogRepository.create(createDialogDto);
  }

  findAll() {
    return this.dialogRepository.find();
  }

  findOne(id: number) {
    return this.dialogRepository.findOneBy({ id });
  }

  update(id: number, updateDialogDto: UpdateDialogDto) {
    return this.dialogRepository.update(id, updateDialogDto);
  }

  remove(id: number) {
    return this.dialogRepository.delete(id);
  }
}
