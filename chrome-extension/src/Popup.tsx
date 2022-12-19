import * as Styled from './Popup.styles'
import { SocialLink } from './SocialLink'
import {
  EnvironmentVariablesImpl,
  SocialNetworkUrls,
} from './EnvironmentVariablesImpl'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface PopupProps {
  urls: SocialNetworkUrls
  title: string
  statusTextOffline: string
  statusTextOnline: string
}

interface StreamerInfo {
  isStreaming: boolean
}

async function getStreamerInfo(): Promise<null | StreamerInfo> {
  const apiUrl = EnvironmentVariablesImpl.getApiUrl()
  try {
    const response = await axios.get(`${apiUrl}/streamer`)
    return response.data as StreamerInfo
  } catch (error) {
    console.error(error)
  }
  return null
}

export const Popup = ({
  urls,
  title,
  statusTextOffline,
  statusTextOnline,
}: PopupProps) => {
  const [streamerInfo, setStreamerInfo] = useState<StreamerInfo | null>(null)

  useEffect(() => {
    updateStreamerInfo()

    const intervalCall = setInterval(() => updateStreamerInfo(), 120000)

    return () => clearInterval(intervalCall)
  }, [])

  function updateStreamerInfo(): void {
    getStreamerInfo().then((streamerInfo) => {
      setStreamerInfo(streamerInfo)
    })
  }

  return (
    <Styled.PopupStyle>
      <header>
        <Styled.Title>{title}</Styled.Title>
      </header>
      <Styled.Main>
        <Styled.Status>
          {streamerInfo?.isStreaming ? (
            <Styled.SquareOnline />
          ) : (
            <Styled.SquareOffline />
          )}
          <Styled.StatusInfo>
            {streamerInfo?.isStreaming ? 'Online' : 'Offline'}
          </Styled.StatusInfo>
          <Styled.StatusText>
            {streamerInfo?.isStreaming ? statusTextOnline : statusTextOffline}
          </Styled.StatusText>
        </Styled.Status>
        <a href={urls.twitch} target="_blank" rel="noreferrer">
          <Styled.StreamImg
            src={
              streamerInfo?.isStreaming
                ? './images/online.png'
                : './images/offline.png'
            }
            alt={streamerInfo?.isStreaming ? 'Online' : 'Offline'}
          />
        </a>
      </Styled.Main>
      <Styled.Footer>
        <Styled.SocialNetworks>
          <SocialLink
            urlLink={urls.tiktok}
            urlIcon={'./images/icons/tiktok.png'}
            altIcon={'Tiktok'}
          />
          <SocialLink
            urlLink={urls.youtube}
            urlIcon={'./images/icons/youtube.png'}
            altIcon={'Youtube'}
          />
          <SocialLink
            urlLink={urls.twitter}
            urlIcon={'./images/icons/twitter.png'}
            altIcon={'Twitter'}
          />
          <SocialLink
            urlLink={urls.discord}
            urlIcon={'./images/icons/discord.png'}
            altIcon={'Discord'}
          />
        </Styled.SocialNetworks>
      </Styled.Footer>
    </Styled.PopupStyle>
  )
}

// TODO: Tests
// TODO: Create a John Doe streamer -> Change img

// TODO: hover css
