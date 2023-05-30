import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import TotalBalanceComponent from './Balance/Balance';
import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import HomeTab from './HomeTab/HomeTab';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);
const Home = () => (
  <>
    <Navigation />
    <TotalBalanceComponent />
    <HomeTab/>
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
