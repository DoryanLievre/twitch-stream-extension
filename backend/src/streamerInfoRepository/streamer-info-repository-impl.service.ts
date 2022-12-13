import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { StreamerInfoRepository } from './streamer-info.repository';
import { StreamerInfo } from '../streamerInfo';

@Injectable()
export class StreamerInfoRepositoryImpl implements StreamerInfoRepository {
  private readonly url: string;
  private readonly config: any;

  private readonly httpService: HttpService;

  constructor(
    clientId: string,
    userId: string,
    accessToken: string,
    httpService: HttpService,
  ) {
    this.url = `https://api.twitch.tv/helix/streams?user_id=${userId}`;
    this.config = {
      headers: {
        'Client-ID': clientId,
        Authorization: `Bearer ${accessToken}`,
      },
    };
    this.httpService = httpService;
  }

  async getStreamerInfo(): Promise<StreamerInfo> {
    try {
      const { data } = await this.httpService.axiosRef.get(
        this.url,
        this.config,
      );
      if (this.isStreaming(data)) return { isStreaming: true } as StreamerInfo;
    } catch (error) {
      throw 'An error occured';
    }
    return { isStreaming: false } as StreamerInfo;
  }

  isStreaming(data: any): boolean {
    return data.data.length > 0;
  }
}
