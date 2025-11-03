import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { heart, home, search } from 'ionicons/icons'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import FavoritesPage from '@/pages/FavoritesPage/FavoritesPage'
import Home from '@/pages/Home/Home'
import MovieDetailsPage from '@/pages/MovieDetailsPage'
import Tab3 from '@/pages/Search/Tab3'

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/favorites'>
            <FavoritesPage />
          </Route>
          <Route exact path='/movie/:id'>
            <MovieDetailsPage />
          </Route>
          <Route path='/tab3'>
            <Tab3 />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot='bottom' className='ion-display-md-none'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon aria-hidden='true' icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab='favorites' href='/favorites'>
            <IonIcon aria-hidden='true' icon={heart} />
            <IonLabel>Favoritos</IonLabel>
          </IonTabButton>

          <IonTabButton tab='search' href='/tab3'>
            <IonIcon aria-hidden='true' icon={search} />
            <IonLabel>Buscar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}
