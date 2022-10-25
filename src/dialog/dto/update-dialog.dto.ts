import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDialogDto } from './create-dialog.dto';

export class UpdateDialogDto extends PartialType(CreateDialogDto) {
  @ApiProperty({ example: 'Chat 1', description: 'Название диалога' })
  name: string;
}
