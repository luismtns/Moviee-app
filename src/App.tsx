import queryClient from '@/lib/query.client'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { heart, home, search } from 'ionicons/icons'
import { Redirect, Route } from 'react-router-dom'

import Home from './pages/Home/Home'
import Tab3 from './pages/Search/Tab3'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import FavoritesPage from '@/pages/FavoritesPage/FavoritesPage'
import './theme/variables.css'

setupIonicReact()

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path='/home'>
              <Home />
            </Route>
            <Route exact path='/favorites'>
              <FavoritesPage />
            </Route>
            <Route path='/tab3'>
              <Tab3 />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot='bottom'>
            <IonTabButton tab='home' href='/home'>
              <IonIcon aria-hidden='true' icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab='favorites' href='/favorites'>
              <IonIcon aria-hidden='true' icon={heart} />
              <IonLabel>Favoritos</IonLabel>
            </IonTabButton>
            <IonTabButton tab='tab3' href='/tab3'>
              <IonIcon aria-hidden='true' icon={search} />
              <IonLabel>Buscar</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)

export default App
