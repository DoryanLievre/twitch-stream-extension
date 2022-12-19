import * as Styled from './Popup.styles'

interface SocialLinkProps {
  urlLink: string
  urlIcon: string
  altIcon: string
}

export const SocialLink = ({ urlLink, urlIcon, altIcon }: SocialLinkProps) => {
  return (
    <a href={urlLink} target="_blank" rel="noreferrer">
      <Styled.SocialNetwork>
        <Styled.SocialIcons src={urlIcon} alt={altIcon} />
      </Styled.SocialNetwork>
    </a>
  )
}
