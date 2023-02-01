// React Imports
import React from 'react';
import { useEffect, useState } from 'react';

// Redux Imports
import { useSelector } from 'react-redux';
import { appStore } from './app/appSlice';
import { authStore } from './app/authSlice';

// Modules Imports
import { Route, Routes, useNavigate } from 'react-router-dom';

// Components Imports
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Navigation/Footer';
import { HomePage } from './components/HomePage';
import { SignIn } from './components/Auth/SignIn/SignIn';
import { ScanCard } from './components/Scan/ScanCard';
import { Dashboard } from './components/Dashboard/Dashboard';

// Other Files Imports
import * as ROUTES from './constants/routes';

// Styling Imports
import './assets/loyalty.css';
//import './assets/debug.css';

function App() {
  const app = useSelector(appStore);
  const auth = useSelector(authStore);

  const navigate = useNavigate();

  const [showNavBar, setShowNavBar] =  useState(true);
  const [appStyleForDashboard, setAppStyleForDashboard] = useState();

  useEffect(() => {
    console.log("COMPONENT RENDERED: App");
  }, [])

  useEffect(() => {
    if(app.nav.activeLink === ROUTES.DASHBOARD && !auth.isAuthenticated) {
      console.log("COMPONENT App: Use not authenticated, Trying to access dashboard, Routing to SignIn Page");
      navigate(ROUTES.SIGN_IN);
    }

    if(app.nav.activeLink === ROUTES.DASHBOARD && auth.isAuthenticated) {
      setShowNavBar(false);
      setAppStyleForDashboard('w-full');
    }

    if(app.nav.activeLink !== ROUTES.DASHBOARD) {
      setShowNavBar(true);
      setAppStyleForDashboard('w-11/12 sm:w-10/12 lg:9/12 max-w-7xl');
    }
  }, [app.nav.activeLink, auth.isAuthenticated])

  useEffect(() => {
    if(auth.isAuthenticated) { 
      console.log("COMPONENT App: User Signed in, Route to Dashboard");
      navigate(ROUTES.DASHBOARD);
    }
}, [auth.isAuthenticated])

  return (
    <div id='wrapper' className='min-h-[70vh]' style={{ backgroundImage: "url('./pattern-white.svg')", backgroundPosition: "center", backgroundRepeat: "repeat" }}>
      <div id='app' className={`${appStyleForDashboard} mx-auto scroll-smooth hover:scroll-auto transition-all`}>

        {(showNavBar) ? <Navbar/> : ''}

        <Routes>
          <Route exact path={ROUTES.HOME_PAGE} element={<HomePage/>}></Route>
          <Route exact path={ROUTES.DASHBOARD} element={<Dashboard/>}></Route>
          <Route exact path={ROUTES.SCAN} element={<ScanCard/>}></Route>
          <Route exact path={ROUTES.SIGN_IN} element={<SignIn/>}></Route>
        </Routes>

        {(showNavBar) ? <Footer/> : ''}
        
      </div>
    </div>
  );
}

export default App;
