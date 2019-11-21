import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ContextProvider } from '../providers/ContextProvider';
import Header from '../components/layout/header/Header';
import Routes from './Routes';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlaneDeparture, faPlaneArrival, faGlobeAmericas, faAngleDown,faPlane, faHome, faSearch, faTicketAlt, faMap,faSuitcase,faBuilding, faShoppingCart, faCreditCard, faCalendarAlt, faUser, faUserFriends, faClock} from '@fortawesome/free-solid-svg-icons'
library.add(faPlaneDeparture, faPlaneArrival, faGlobeAmericas, faAngleDown,faPlane, faHome, faSearch, faTicketAlt, faMap,faSuitcase,faBuilding, faShoppingCart, faCreditCard, faCalendarAlt, faUser, faUserFriends, faClock);
const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Header/>
        <Switch>
          <Route path="/" component={Routes}/>
        </Switch>
      </ContextProvider>
    </Router>
  )
}

export default App;
