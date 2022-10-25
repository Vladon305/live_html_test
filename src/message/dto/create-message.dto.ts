import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateMessageDto {
  @ApiProperty({ example: 'Привет', description: 'Сообщение' })
  message: string;

  @ApiProperty({
    example: '1',
    description: 'Id пользователя отправившего сообщение',
  })
  userId: string;
}
