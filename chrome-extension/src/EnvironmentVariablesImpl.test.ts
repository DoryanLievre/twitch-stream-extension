import {
  EnvironmentVariablesImpl,
  SocialNetworkUrls,
} from './EnvironmentVariablesImpl'

describe('EnvironmentVariablesImpl', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    process.env = { ...OLD_ENV }
  })

  it("getTitle() should return 'Amazing Title' when REACT_APP_TITLE is set", () => {
    // Given
    process.env.REACT_APP_TITLE = 'Amazing title'

    // When
    const title = EnvironmentVariablesImpl.getTitle()

    // Then
    expect(title).toEqual('Amazing title')
  })

  it("getTitle() should return 'No title assigned.' when REACT_APP_TITLE is not set (undefined)", () => {
    // Given
    process.env.REACT_APP_TITLE = undefined

    // When
    const title = EnvironmentVariablesImpl.getTitle()

    // Then
    expect(title).toEqual('No title assigned.')
  })

  it("getStatusTextOffline() should return 'Lorem Ipsum offline' when REACT_APP_STATUSTEXT_OFFLINE is set", () => {
    // Given
    process.env.REACT_APP_STATUSTEXT_OFFLINE = 'Lorem Ipsum offline'

    // When
    const statusTextOffline = EnvironmentVariablesImpl.getStatusTextOffline()

    // Then
    expect(statusTextOffline).toEqual('Lorem Ipsum offline')
  })

  it("getStatusTextOffline() should return 'No offline status text assigned.' when REACT_APP_STATUSTEXT_OFFLINE is not set", () => {
    // Given
    process.env.REACT_APP_STATUSTEXT_OFFLINE = undefined

    // When

    const statusTextOffline = EnvironmentVariablesImpl.getStatusTextOffline()

    // Then
    expect(statusTextOffline).toEqual('No offline status text assigned.')
  })

  it("getStatusTextOnline() should return 'Lorem Ipsum online' when REACT_APP_STATUSTEXT_ONLINE is set", () => {
    // Given
    process.env.REACT_APP_STATUSTEXT_ONLINE = 'Lorem Ipsum online'

    // When
    const statusTextOnline = EnvironmentVariablesImpl.getStatusTextOnline()

    // Then
    expect(statusTextOnline).toEqual('Lorem Ipsum online')
  })

  it("getStatusTextOnline() should return 'No online status text assigned.' when REACT_APP_STATUSTEXT_ONLINE is not set", () => {
    // Given
    process.env.REACT_APP_STATUSTEXT_ONLINE = undefined

    // When
    const statusTextOnline = EnvironmentVariablesImpl.getStatusTextOnline()

    // Then
    expect(statusTextOnline).toEqual('No online status text assigned.')
  })

  it("getApiUrl() should return 'Lorem Ipsum' when REACT_APP_URL_API is set", () => {
    // Given
    process.env.REACT_APP_URL_API = 'http://localhost:8080'

    // When
    const apiUrl = EnvironmentVariablesImpl.getApiUrl()

    // Then
    expect(apiUrl).toEqual('http://localhost:8080')
  })

  it("getApiUrl() should return 'No api url assigned.' when REACT_APP_URL_API is not set", () => {
    // Given
    process.env.REACT_APP_URL_API = undefined

    // When
    const apiUrl = EnvironmentVariablesImpl.getApiUrl()

    // Then
    expect(apiUrl).toEqual('No api url assigned.')
  })

  test.each`
    REACT_APP_URL_TWITCH       | REACT_APP_URL_TIKTOK        | REACT_APP_URL_YOUTUBE        | REACT_APP_URL_TWITTER    | REACT_APP_URL_DISCORD    | expectedSocialNetworkUrls
    ${'https://www.twitch.tv'} | ${'https://www.tiktok.com'} | ${'https://www.youtube.com'} | ${'https://twitter.com'} | ${'https://discord.com'} | ${new SocialNetworkUrls('https://www.twitch.tv', 'https://www.tiktok.com', 'https://www.youtube.com', 'https://twitter.com', 'https://discord.com')}
    ${undefined}               | ${undefined}                | ${undefined}                 | ${undefined}             | ${undefined}             | ${new SocialNetworkUrls('No twitch url assigned.', 'No tiktok url assigned.', 'No youtube url assigned.', 'No twitter url assigned.', 'No discord url assigned.')}
    ${'https://www.twitch.tv'} | ${undefined}                | ${undefined}                 | ${undefined}             | ${undefined}             | ${new SocialNetworkUrls('https://www.twitch.tv', 'No tiktok url assigned.', 'No youtube url assigned.', 'No twitter url assigned.', 'No discord url assigned.')}
    ${undefined}               | ${'https://www.tiktok.com'} | ${undefined}                 | ${undefined}             | ${undefined}             | ${new SocialNetworkUrls('No twitch url assigned.', 'https://www.tiktok.com', 'No youtube url assigned.', 'No twitter url assigned.', 'No discord url assigned.')}
    ${undefined}               | ${undefined}                | ${'https://www.youtube.com'} | ${undefined}             | ${undefined}             | ${new SocialNetworkUrls('No twitch url assigned.', 'No tiktok url assigned.', 'https://www.youtube.com', 'No twitter url assigned.', 'No discord url assigned.')}
    ${undefined}               | ${undefined}                | ${undefined}                 | ${'https://twitter.com'} | ${undefined}             | ${new SocialNetworkUrls('No twitch url assigned.', 'No tiktok url assigned.', 'No youtube url assigned.', 'https://twitter.com', 'No discord url assigned.')}
    ${undefined}               | ${undefined}                | ${undefined}                 | ${undefined}             | ${'https://discord.com'} | ${new SocialNetworkUrls('No twitch url assigned.', 'No tiktok url assigned.', 'No youtube url assigned.', 'No twitter url assigned.', 'https://discord.com')}
  `(
    'getSocialNetworkUrls() should return $expectedSocialNetworkUrls when REACT_APP_URL_TWITCH=$REACT_APP_URL_TWITCH, REACT_APP_URL_TIKTOK=$REACT_APP_URL_TIKTOK, REACT_APP_URL_YOUTUBE=$REACT_APP_URL_YOUTUBE, REACT_APP_URL_TWITTER=$REACT_APP_URL_TWITTER and REACT_APP_URL_DISCORD=$REACT_APP_URL_DISCORD',
    ({
      REACT_APP_URL_TWITCH,
      REACT_APP_URL_TIKTOK,
      REACT_APP_URL_YOUTUBE,
      REACT_APP_URL_TWITTER,
      REACT_APP_URL_DISCORD,
      expectedSocialNetworkUrls,
    }) => {
      // Given
      process.env.REACT_APP_URL_TWITCH = REACT_APP_URL_TWITCH
      process.env.REACT_APP_URL_TIKTOK = REACT_APP_URL_TIKTOK
      process.env.REACT_APP_URL_YOUTUBE = REACT_APP_URL_YOUTUBE
      process.env.REACT_APP_URL_TWITTER = REACT_APP_URL_TWITTER
      process.env.REACT_APP_URL_DISCORD = REACT_APP_URL_DISCORD

      // When
      const socialNetworkUrls = EnvironmentVariablesImpl.getSocialNetworkUrls()

      // Then
      expect(socialNetworkUrls).toEqual(expectedSocialNetworkUrls)
    }
  )
})
