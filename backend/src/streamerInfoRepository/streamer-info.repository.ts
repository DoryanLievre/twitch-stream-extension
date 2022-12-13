import { StreamerInfo } from '../streamerInfo';

export abstract class StreamerInfoRepository {
  abstract getStreamerInfo(): Promise<StreamerInfo>;
}
