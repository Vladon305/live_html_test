import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  name: string;
}
