import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamerInfoRepository } from './streamerInfoRepository/streamer-info.repository';
import { StreamerInfoRepositoryStub } from './fixtures/streamer-info-repository-stub.service';
import { StreamerInfo } from './streamerInfo';
import spyOn = jest.spyOn;
import { HttpException, HttpStatus } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let streamerInfoRepository: StreamerInfoRepositoryStub;

  beforeEach(async () => {
    streamerInfoRepository = new StreamerInfoRepositoryStub();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: StreamerInfoRepository,
          useValue: streamerInfoRepository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Alive!"', () => {
      expect(appController.getHealth()).toBe('Alive!');
    });

    it('should return StreamerInfo with isStreaming at False', async () => {
      const expectedStreamerInfo: StreamerInfo = { isStreaming: false };

      const streamerInfo = await appController.getStreamerInfo();

      expect(streamerInfo).toStrictEqual(expectedStreamerInfo);
    });
    it('should return error 500 when ...', async () => {
      // Given
      spyOn(streamerInfoRepository, 'getStreamerInfo').mockImplementation(
        () => {
          throw 'An error occured';
        },
      );

      // When
      const getStreamerInfo = async () => await appController.getStreamerInfo();

      // Then
      expect(getStreamerInfo).rejects.toThrow(
        new HttpException('An error occured', HttpStatus.INTERNAL_SERVER_ERROR),
      );
    });
  });
});
