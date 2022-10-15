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

  async create(createUserDto: CreateUserDto, ava: any) {
    const fileName = this.fileService.createFileFromUrl(
      'https://joeschmoe.io/api/v1/random',
    );
    const user = this.usersRepository.create({
      ...createUserDto,
      ava: fileName,
    });

    return user;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
