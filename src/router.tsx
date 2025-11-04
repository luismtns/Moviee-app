import { IonRouterOutlet, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { TabBar } from '@/components/TabBar/TabBar'
import FavoritesPage from '@/pages/FavoritesPage/FavoritesPage'
import Home from '@/pages/Home/Home'
import MovieDetailsPage from '@/pages/MovieDetailsPage'
import Search from '@/pages/Search/Search'

export const Router: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet animated={false}>
          <Route path='/'>
            <Redirect to='/home' />
          </Route>
          <Route exact path='/home'>
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

        <TabBar />
      </IonTabs>
    </IonReactRouter>
  )
}
