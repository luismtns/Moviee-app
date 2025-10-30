import { setupIonicReact } from '@ionic/react'
import '@testing-library/jest-dom/extend-expect'

setupIonicReact()

// Mock matchmedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }
