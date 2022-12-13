import { StreamerInfoRepositoryImpl } from './streamer-info-repository-impl.service';
import { HttpService } from '@nestjs/axios';
import { StreamerInfoRepository } from './streamer-info.repository';
import spyOn = jest.spyOn;

describe('Repository', () => {
  describe('root', () => {
    let streamerInfoRepositoryImpl: StreamerInfoRepository;
    let httpService: HttpService;

    beforeEach(() => {
      httpService = new HttpService();

      const clientId = 'fakeClientId';
      const accessToken = 'fakeAccessToken';
      const userId = 'fakeUserId';

      streamerInfoRepositoryImpl = new StreamerInfoRepositoryImpl(
        clientId,
        userId,
        accessToken,
        httpService,
      );
    });

    it('should return isStreaming at false when data length is equal to 0', async () => {
      // Given
      const expectedStreamerInfo = { isStreaming: false };
      const data = { data: [] };

      spyOn(httpService.axiosRef, 'get').mockResolvedValue({ data });

      // When
      const streamerInfo = await streamerInfoRepositoryImpl.getStreamerInfo();

      // Then
      expect(streamerInfo).toStrictEqual(expectedStreamerInfo);
    });

    it('should return isStreaming at true when data length is more than 0', async () => {
      // Given
      const expectedStreamerInfo = { isStreaming: true };
      const data = { data: ['toto'] };

      spyOn(httpService.axiosRef, 'get').mockResolvedValue({ data });

      // When
      const streamerInfo = await streamerInfoRepositoryImpl.getStreamerInfo();

      // Then
      expect(streamerInfo).toStrictEqual(expectedStreamerInfo);
    });
    it('should throw "An error occured" when an error is thrown', async () => {
      // Given
      spyOn(httpService.axiosRef, 'get').mockImplementation(() => {
        throw 'An error occured';
      });

      // When
      const getStreamerInfo = async () =>
        await streamerInfoRepositoryImpl.getStreamerInfo();

      // Then
      expect(getStreamerInfo).rejects.toMatch('An error occured');
    });
  });
});
