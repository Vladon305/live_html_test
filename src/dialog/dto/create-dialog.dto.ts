import { ApiProperty } from '@nestjs/swagger';

export class CreateDialogDto {
  @ApiProperty({ example: 'Chat 1', description: 'Название диалога' })
  name: string;
}
