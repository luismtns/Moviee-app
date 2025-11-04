import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react'
import { heart, home } from 'ionicons/icons'
import React from 'react'

export const TabBar: React.FC = () => {
  return (
    <IonTabBar slot='bottom' className='ion-display-md-none'>
      <IonTabButton tab='home' href='/home'>
        <IonIcon aria-hidden='true' icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab='favorites' href='/favorites'>
        <IonIcon aria-hidden='true' icon={heart} />
        <IonLabel>Favoritos</IonLabel>
      </IonTabButton>
    </IonTabBar>
  )
}
