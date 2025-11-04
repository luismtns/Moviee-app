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
          <Route exact path='/home' component={Home} />
          <Route exact path='/favorites' component={FavoritesPage} />
          <Route exact path='/movie/:id' component={MovieDetailsPage} />
          <Route exact path='/search' component={Search} />
          <Redirect exact from='/' to='/home' />
        </IonRouterOutlet>

        <TabBar />
      </IonTabs>
    </IonReactRouter>
  )
}
