import styled from 'styled-components'

export const PopupStyle = styled.div`
  width: 300px;
  height: 400px;
  padding: 20px 30px;
  background: rgb(0,0,0);
  background: linear-gradient(315deg, rgba(0,0,0,1) 4%, rgba(33,66,176,1) 100%);  
`

export const Title = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 48px;
  text-align: center;
  color: #b2b8cc
  ;
  text-transform: uppercase;
`
export const Main = styled.main`
  margin-top: 20px;
`

export const Status = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  grid-column-gap: 10px;
  align-items: center;
`

export const SquareOnline = styled.div`
  width: 20px;
  height: 20px;
  background: green;
  text-transform: uppercase;
`

export const SquareOffline = styled.div`
  width: 20px;
  height: 20px;
  background: red;
  text-transform: uppercase;
`

export const StatusInfo = styled.span`
  padding: 0;
  margin: 0;
  font-size: 30px;
  color: white;
`
export const StatusText = styled.p`
  display: grid;
  grid-column-start: 1;
  grid-column-end: 3;
  margin-bottom: 25px;
  font-size: 18px;
  color: white;
`

export const StreamImg = styled.img`
  width: 100%;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
`

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
`
export const SocialNetworks = styled.div`
  display: flex;
  margin-top: 20px;
  column-gap: 10px;
`
export const SocialNetwork = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  border-left: solid 1px black;
  background-color: #b2b8cc
  ;
  text-transform: uppercase;
`
export const SocialIcons = styled.img`
  width: 25px;
  height: 25px;
`
