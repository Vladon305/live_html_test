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
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';

@Controller('dialog')
export class DialogController {
  constructor(private readonly dialogService: DialogService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createDialogDto: CreateDialogDto,
  ) {
    return this.dialogService.create(userId, createDialogDto);
  }

  @Get()
  findAll() {
    return this.dialogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialogService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDialogDto: UpdateDialogDto) {
    return this.dialogService.update(id, updateDialogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dialogService.remove(id);
  }

  @Put(':id')
  addUser(@Param('id') id: string, @Body() { userId }: { userId: string }) {
    return this.dialogService.addUser(id, userId);
  }
}
