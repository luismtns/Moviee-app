import Logo from '@/components/Logo/Logo'
import { IonBackButton, IonButtons, IonCol, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import './Header.css'
import { Navigation } from './Navigation/Navigation'
import { SearchBar } from './SearchBar/SearchBar'

type HeaderProps = {
  backHref?: string
}
const Header = ({ backHref }: HeaderProps) => {
  return (
    <IonHeader color='dark' className='main-header'>
      <IonToolbar>
        {backHref && (
          <IonButtons slot='start'>
            <IonBackButton defaultHref={backHref} />
          </IonButtons>
        )}
        <IonGrid>
          <IonRow className='ion-align-items-center ion-justify-content-between'>
            <IonCol sizeSm='2' sizeLg='3' size='auto'>
              <div className='logo-container'>
                <Logo />
                <IonTitle className='header-title ion-display-none ion-display-md-block'>
                  <span className='app-name'>Moviee</span>
                </IonTitle>
              </div>
            </IonCol>

            <IonCol sizeLg='4'>
              <SearchBar />
            </IonCol>

            <IonCol size='auto' className='ion-justify-self-end ion-display-md-block ion-display-none'>
              <Navigation />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  )
}
export default Header
