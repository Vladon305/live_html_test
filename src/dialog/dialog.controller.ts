import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';
import { Dialog } from './entities/dialog.entity';

@ApiTags('Диалоги')
@Controller('dialogs')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @ApiOperation({ summary: 'Создание диалога' })
  @ApiResponse({ status: 200, type: Dialog })
  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createDialogDto: CreateDialogDto,
  ) {
    return this.dialogService.create(userId, createDialogDto);
  }

  @ApiOperation({ summary: 'Получение всех диалогов' })
  @ApiResponse({ status: 200, type: [Dialog] })
  @Get()
  findAll() {
    return this.dialogService.findAll();
  }

  @ApiOperation({ summary: 'Получить один диалог' })
  @ApiResponse({ status: 200, type: Dialog })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialogService.findOne(id);
  }

  @ApiOperation({ summary: 'Изменить диалог' })
  @ApiResponse({ status: 200, type: Dialog })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDialogDto: UpdateDialogDto) {
    return this.dialogService.update(id, updateDialogDto);
  }

  @ApiOperation({ summary: 'Удалить диалог' })
  @ApiResponse({ status: 200, type: Dialog })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialogService.remove(id);
  }

  @ApiOperation({
    summary: 'Добавить пользователя в диалог /тестовая доработка',
  })
  @ApiResponse({ status: 200, type: Dialog })
  @Put(':id')
  addUser(@Param('id') id: string, @Body() { userId }: { userId: string }) {
    return this.dialogService.addUser(id, userId);
  }
}
