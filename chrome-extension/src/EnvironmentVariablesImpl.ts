interface EnvironmentVariables {
  getTitle: () => string
  getStatusTextOnline: () => string
  getStatusTextOffline: () => string
  getApiUrl: () => string
  getSocialNetworkUrls: () => SocialNetworkUrls
}

class EnvironmentVariablesImpl implements EnvironmentVariables {
  private static instance: EnvironmentVariablesImpl

  private constructor() {}

  static getInstance(): EnvironmentVariablesImpl {
    if (!EnvironmentVariablesImpl.instance)
      EnvironmentVariablesImpl.instance = new EnvironmentVariablesImpl()
    return EnvironmentVariablesImpl.instance
  }

  getTitle = (): string =>
    process.env.REACT_APP_TITLE
      ? process.env.REACT_APP_TITLE
      : 'No title assigned.'
  getStatusTextOnline = (): string =>
    process.env.REACT_APP_STATUSTEXT_ONLINE
      ? process.env.REACT_APP_STATUSTEXT_ONLINE
      : 'No online status text assigned.'

  getStatusTextOffline = (): string =>
    process.env.REACT_APP_STATUSTEXT_OFFLINE
      ? process.env.REACT_APP_STATUSTEXT_OFFLINE
      : 'No offline status text assigned.'

  getApiUrl = (): string =>
    process.env.REACT_APP_URL_API
      ? process.env.REACT_APP_URL_API
      : 'No api url assigned.'

  getSocialNetworkUrls(): SocialNetworkUrls {
    return {
      twitch: this.getTwitchUrl(),
      tiktok: this.getTiktokUrl(),
      youtube: this.getYoutubeUrl(),
      twitter: this.getTwitterUrl(),
      discord: this.getDiscordUrl(),
    } as SocialNetworkUrls
  }

  private getTwitchUrl = (): string =>
    process.env.REACT_APP_URL_TWITCH
      ? process.env.REACT_APP_URL_TWITCH
      : 'No twitch url assigned.'

  private getTiktokUrl = (): string =>
    process.env.REACT_APP_URL_TIKTOK
      ? process.env.REACT_APP_URL_TIKTOK
      : 'No tiktok url assigned.'

  private getYoutubeUrl = (): string =>
    process.env.REACT_APP_URL_YOUTUBE
      ? process.env.REACT_APP_URL_YOUTUBE
      : 'No youtube url assigned.'

  private getTwitterUrl = (): string =>
    process.env.REACT_APP_URL_TWITTER
      ? process.env.REACT_APP_URL_TWITTER
      : 'No twitter url assigned.'

  private getDiscordUrl = (): string =>
    process.env.REACT_APP_URL_DISCORD
      ? process.env.REACT_APP_URL_DISCORD
      : 'No discord url assigned.'
}

export class SocialNetworkUrls {
  constructor(
    public readonly twitch: string,
    public readonly tiktok: string,
    public readonly youtube: string,
    public readonly twitter: string,
    public readonly discord: string
  ) {}
}

const environmentVariables = EnvironmentVariablesImpl.getInstance()

export { environmentVariables as EnvironmentVariablesImpl }
