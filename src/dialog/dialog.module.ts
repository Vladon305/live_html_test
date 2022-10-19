import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogController } from './dialog.controller';
import { Dialog } from './entities/dialog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dialog, User])],
  controllers: [DialogController],
  providers: [DialogService],
})
export class DialogModule {}
