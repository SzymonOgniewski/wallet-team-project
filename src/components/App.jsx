import React, { lazy, Suspense, startTransition } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import TotalBalanceComponent from './Balance/Balance';
import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import Header from "./Header/Header";
import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);
const Home = () => (
  <>
    <Navigation />
    <TotalBalanceComponent />
    <h1>Home Page</h1>
  </>
);
const Diagram = () => (
  <>
    <Navigation />
    <TotalBalanceComponent />
    <h1>Diagram Page</h1>
  </>
);
const Currency = () => (
  <>
    <Navigation />
    <TotalBalanceComponent />
    <CurrencyComponent />
  </>
);

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <TotalBalanceComponent />
        <ButtonAddTransactions />
        <Navigation />
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/registration"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RegistrationPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Home />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/currency" element={<Currency />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
