import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamerInfoRepositoryImpl } from './streamerInfoRepository/streamer-info-repository-impl.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StreamerInfoRepository } from './streamerInfoRepository/streamer-info.repository';

const streamerInfoProvider = {
  provide: StreamerInfoRepository,
  inject: [ConfigService, HttpService],
  useFactory: (configService: ConfigService, httpService: HttpService) => {
    const clientId = configService.get<string>('CLIENT_ID');
    const userId = configService.get<string>('USER_ID');
    const accessToken = configService.get<string>('ACCESS_TOKEN');

    if (clientId && userId && accessToken) {
      return new StreamerInfoRepositoryImpl(
        clientId,
        userId,
        accessToken,
        httpService,
      );
    }
  },
};
@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, streamerInfoProvider],
})
export class AppModule {}
