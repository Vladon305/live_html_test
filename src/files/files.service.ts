import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as uuid from 'uuid';
import axios from 'axios';
import { Stream } from 'stream';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createFileFromUrl(url: string) {
    const fileName = uuid.v4() + '.svg';
    const filePath = path.resolve(__dirname, '..', 'static');
    try {
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      this.downloadImage(url, path.join(filePath, fileName));

      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async downloadImage(url: string, filePath: string) {
    // const writer = fs.createWriteStream(filePath);
    // writer.on('open', (fd) => {
    //   https.request(url, (res) => {
    //     res
    //       .on('data', (chunk) => {
    //         writer.write(chunk);
    //       })
    //       .on('end', () => {
    //         writer.end();
    //         fs.renameSync(writer.path, filePath);
    //       });
    //   });
    // });

    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          if (res.statusCode !== 200) {
            const err = new Error("File couldn't be retrieved");
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            err.status = res.statusCode;
            return reject(err);
          }
          let chunks = [];
          res.setEncoding('binary');
          res
            .on('data', (chunk) => {
              chunks += chunk;
            })
            .on('end', () => {
              const stream = fs.createWriteStream(filePath);
              stream.write(chunks, 'binary');
              stream.on('finish', () => {
                resolve('File Saved !');
              });
              res.pipe(stream);
            });
        })
        .on('error', (e) => {
          console.log('Error: ' + e);
          reject(e.message);
        });
    });
  }
}
