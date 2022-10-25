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
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        ...createUserDto,
        ava: fileName,
        dialogs: [],
      }),
    );

    return user;
  }

  async findAll() {
    return await this.usersRepository.find({ relations: ['dialogs'] });
  }

  async findOne(id: string) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['dialogs'],
    });
  }

  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
