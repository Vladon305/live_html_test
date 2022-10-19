import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private fileService: FilesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const fileName = await this.fileService.createFileFromUrl(
      'https://joeschmoe.io/api/v1/random',
    );
    const user = this.usersRepository.save(
      this.usersRepository.create({
        ...createUserDto,
        ava: fileName,
        dialogs: [],
      }),
    );

    return user;
  }

  findAll() {
    return this.usersRepository.find({ relations: ['dialogs'] });
  }

  findOne(id: any) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['dialogs'],
    });
  }

  remove(id: any) {
    return this.usersRepository.delete(id);
  }
}
