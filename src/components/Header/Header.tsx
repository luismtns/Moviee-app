import Logo from '@/components/Logo/Logo'
import { IonCol, IonGrid, IonHeader, IonRow, IonTitle, IonToolbar } from '@ionic/react'
import './Header.css'
import { Navigation } from './Navigation/Navigation'
import { SearchBar } from './SearchBar/SearchBar'

const Header = () => {
  return (
    <IonHeader color='dark' className='main-header'>
      <IonToolbar>
        <IonGrid>
          <IonRow className='ion-align-items-center ion-justify-content-between'>
            <IonCol size='auto'>
              <div className='logo-container'>
                <Logo />
                <IonTitle className='header-title'>
                  <span className='app-name'>Moviee</span>
                </IonTitle>
              </div>
            </IonCol>

            <IonCol sizeLg='4'>
              <SearchBar />
            </IonCol>

            <IonCol size='auto' className='ion-justify-self-end'>
              <Navigation />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  )
}
export default Header
