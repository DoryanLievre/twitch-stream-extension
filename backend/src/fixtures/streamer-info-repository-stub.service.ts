import { Injectable } from '@nestjs/common';
import { StreamerInfoRepository } from '../streamerInfoRepository/streamer-info.repository';
import { StreamerInfo } from '../streamerInfo';

@Injectable()
export class StreamerInfoRepositoryStub implements StreamerInfoRepository {
  constructor(private streamerInfo: StreamerInfo = { isStreaming: false }) {}
  getStreamerInfo(): Promise<StreamerInfo> {
    return Promise.resolve(this.streamerInfo);
  }
}
