import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { heart, home, search } from 'ionicons/icons'
import React from 'react'
import { Route } from 'react-router-dom'

import FavoritesPage from '@/pages/FavoritesPage/FavoritesPage'
import Home from '@/pages/Home/Home'
import MovieDetailsPage from '@/pages/MovieDetailsPage'
import Search from '@/pages/Search/Search'

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/favorites'>
            <FavoritesPage />
          </Route>
          <Route exact path='/movie/:id'>
            <MovieDetailsPage />
          </Route>
          <Route exact path='/search'>
            <Search />
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

          <IonTabButton tab='search' href='/search'>
            <IonIcon aria-hidden='true' icon={search} />
            <IonLabel>Buscar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}
