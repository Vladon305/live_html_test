import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';

@Injectable()
export class PusherService {
  pusher: Pusher;
  constructor() {
    this.pusher = new Pusher({
      appId: '1490979',
      key: 'e9050992da8683055e84',
      secret: 'e91c2060f390e17535a6',
      cluster: 'eu',
      useTLS: true,
    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
  }
}
