import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
import TotalBalanceComponent from './Balance/Balance';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import Header from "./Header/Header";
import HomeTab from './HomeTab/HomeTab'; 
import { lazy } from 'react';
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

const Home = () => <HomeTab />;
const Diagram = () => <h1>Diagram Page</h1>;
const Currency = () => <CurrencyComponent />;

export const App = () => {
  return (
    <Router>
      <div>
 <Header />
  <TotalBalanceComponent />
        <Navigation />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" exact element={<Home />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/currency" element={<Currency />} />
        </Routes>
        {/* <CurrencyComponent /> */}
      </div>
    </Router>
  );
};

