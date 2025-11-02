import { defineCustomElements } from '@ionic/pwa-elements/loader'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// https://capacitorjs.com/docs/web/pwa-elements
defineCustomElements(window)

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
