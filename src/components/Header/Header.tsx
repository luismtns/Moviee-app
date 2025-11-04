import { SearchBar } from '@/components/Header/SearchBar/SearchBar'
import Logo from '@/components/Logo/Logo'
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import './Header.css'
import { Navigation } from './Navigation/Navigation'

type HeaderProps = {
  backHref?: string
}
const Header = ({ backHref }: HeaderProps) => {
  return (
    <IonHeader color='dark' className='main-header' collapse='fade'>
      <IonToolbar>
        {backHref && (
          <IonButtons slot='start'>
            <IonBackButton defaultHref={backHref} />
          </IonButtons>
        )}
        <IonTitle slot='start'>
          <Logo />
          <span className='app-name ion-display-none ion-display-md-inline'>Moviee</span>
        </IonTitle>
        <SearchBar />
        <Navigation />
      </IonToolbar>
    </IonHeader>
  )
}
export default Header
