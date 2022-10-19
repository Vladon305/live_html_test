import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DialogModule } from './dialog/dialog.module';
import { User } from './user/entities/user.entity';
import { Dialog } from './dialog/entities/dialog.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { FilesModule } from './files/files.module';
import { resolve } from 'path';
import { PusherModule } from './pusher/pusher.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Dialog, Message],
      synchronize: true,
    }),
    UserModule,
    DialogModule,
    MessageModule,
    FilesModule,
    PusherModule,
  ],
})
export class AppModule {}
