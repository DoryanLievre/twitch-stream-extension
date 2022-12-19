import * as Styled from './Popup.styles'
import { SocialNetworkUrls } from './EnvironmentVariablesImpl'
import axios from 'axios'
import { act, render, screen } from '@testing-library/react'
import { Popup } from './Popup'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

class JohnDoe {
  static getSocialNetworkUrls(): SocialNetworkUrls {
    return new SocialNetworkUrls(
      'https://www.twitch.tv',
      'https://www.tiktok.com',
      'https://www.youtube.com',
      'https://twitter.com',
      'https://discord.com'
    )
  }

  static getTitle = (): string => 'John Doe'

  static getStatusTextOffline = (): string => 'I am offline !'

  static getStatusTextOnline = (): string => 'I am online !'
}

describe('Popup component', () => {
  test.each`
    givenGetStreamerInfoData  | expectedSquareClassName                         | expectedStatusInfo | expectedStatusText                | expectedSrcStreamImg      | expectedAltStreamImg
    ${{ isStreaming: true }}  | ${Styled.SquareOnline.toString().substring(1)}  | ${'Online'}        | ${JohnDoe.getStatusTextOnline()}  | ${'./images/online.png'}  | ${'Online'}
    ${{ isStreaming: false }} | ${Styled.SquareOffline.toString().substring(1)} | ${'Offline'}       | ${JohnDoe.getStatusTextOffline()} | ${'./images/offline.png'} | ${'Offline'}
  `(
    '',
    async ({
      givenGetStreamerInfoData,
      expectedSquareClassName,
      expectedStatusInfo,
      expectedStatusText,
      expectedSrcStreamImg,
      expectedAltStreamImg,
    }) => {
      // Given
      mockedAxios.get.mockResolvedValue({
        data: givenGetStreamerInfoData,
      })

      // When
      await act(async () =>
        render(
          <Popup
            urls={JohnDoe.getSocialNetworkUrls()}
            title={JohnDoe.getTitle()}
            statusTextOffline={JohnDoe.getStatusTextOffline()}
            statusTextOnline={JohnDoe.getStatusTextOnline()}
          />
        )
      )

      // Then
      const header = screen.getByRole('banner')

      expect(header.textContent).toEqual(JohnDoe.getTitle())

      const main = screen.getByRole('main')

      expectedMainContent(
        main,
        expectedSquareClassName,
        expectedStatusInfo,
        expectedStatusText,
        expectedSrcStreamImg,
        expectedAltStreamImg
      )

      const footer = screen.getByRole('contentinfo')
      const socialNetworksContainer = footer.children[0]

      expect(socialNetworksContainer.children[0].getAttribute('href')).toEqual(
        JohnDoe.getSocialNetworkUrls().tiktok
      )
      expect(socialNetworksContainer.children[1].getAttribute('href')).toEqual(
        JohnDoe.getSocialNetworkUrls().youtube
      )
      expect(socialNetworksContainer.children[2].getAttribute('href')).toEqual(
        JohnDoe.getSocialNetworkUrls().twitter
      )
      expect(socialNetworksContainer.children[3].getAttribute('href')).toEqual(
        JohnDoe.getSocialNetworkUrls().discord
      )
    }
  )

  function expectedMainContent(
    main: HTMLElement,
    expectedSquareClassName: string,
    expectedStatusInfo: string,
    expectedStatusText: string,
    expectedSrcStreamImg: string,
    expectedAltStreamImg: string
  ) {
    const statusContainer = main.firstElementChild
    expect(statusContainer?.children[0]).toHaveClass(expectedSquareClassName)
    expect(statusContainer?.children[1].textContent).toEqual(expectedStatusInfo)
    expect(statusContainer?.children[2].textContent).toEqual(expectedStatusText)

    const streamImg = main.lastElementChild?.firstElementChild

    expect(streamImg?.getAttribute('src')).toEqual(expectedSrcStreamImg)
    expect(streamImg?.getAttribute('alt')).toEqual(expectedAltStreamImg)
  }
})
