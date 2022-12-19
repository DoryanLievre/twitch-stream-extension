import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Popup } from './Popup'
import { EnvironmentVariablesImpl } from './EnvironmentVariablesImpl'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Popup
      title={EnvironmentVariablesImpl.getTitle()}
      statusTextOffline={EnvironmentVariablesImpl.getStatusTextOffline()}
      statusTextOnline={EnvironmentVariablesImpl.getStatusTextOnline()}
      urls={EnvironmentVariablesImpl.getSocialNetworkUrls()}
    />
  </React.StrictMode>
)
