import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StreamerInfoRepository } from './streamerInfoRepository/streamer-info.repository';
import { StreamerInfo } from './streamerInfo';
import { HttpException, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly streamerInfoRepository: StreamerInfoRepository,
  ) {}

  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/streamer')
  getStreamerInfo(): Promise<StreamerInfo> {
    let streamerInfo;
    try {
      streamerInfo = this.streamerInfoRepository.getStreamerInfo();
    } catch (error) {
      throw new HttpException(
        'An error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return streamerInfo;
  }
}
