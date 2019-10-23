import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
//* Providers
import { ContextProvider } from '../providers/ContextProvider';
//* Header
import Header from '../components/layout/header/Header';
//* Routes
import Routes from './Routes';
//* Global CSS
import './App.css';
//* Toastify
import 'react-toastify/dist/ReactToastify.css';
//* Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlaneDeparture, faPlaneArrival, faGlobeAmericas, faAngleDown,faPlane, faHome, faSearch, faTicketAlt, faMap,faSuitcase,faBuilding} from '@fortawesome/free-solid-svg-icons'
library.add(faPlaneDeparture, faPlaneArrival, faGlobeAmericas, faAngleDown,faPlane, faHome, faSearch, faTicketAlt, faMap,faSuitcase,faBuilding);
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
