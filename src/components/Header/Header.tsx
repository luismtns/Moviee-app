import { Navigation } from '@/components/Header/Navigation/Navigation'
import { SearchBar } from '@/components/Header/SearchBar/SearchBar'
import LoginButton from '@/components/LoginButton/LoginButton'
import Logo from '@/components/Logo/Logo'
import UserAvatar from '@/components/UserAvatar'
import { useAuth } from '@/hooks'
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import './Header.css'

type HeaderProps = {
  backHref?: string
}
const Header = ({ backHref }: HeaderProps) => {
  const { isAuthenticated } = useAuth()

  return (
    <IonHeader color='dark' className='main-header' collapse='fade'>
      <IonToolbar>
        {/* https://ionicframework.com/docs/api/toolbar#slots */}
        <IonButtons slot='start'>{backHref && <IonBackButton defaultHref={backHref} />}</IonButtons>
        <IonTitle>
          <Logo />
          <span className='ion-display-none' aria-label='Moviee explorer' hidden>
            Moviee explorer
          </span>
        </IonTitle>
        <Navigation />
        <IonButtons slot='end'>
          {isAuthenticated && <UserAvatar />}
          {!isAuthenticated && <LoginButton />}
        </IonButtons>
      </IonToolbar>{' '}
      <SearchBar />
    </IonHeader>
  )
}
export default Header
