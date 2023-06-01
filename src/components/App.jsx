import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import { Home } from 'pages/HomePage/HomePage';
import { Diagram } from 'pages/StatisticsPage/StatisticsPage';
import { Currency } from 'pages/CurrencyPage/CurrencyPage';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);

export const App = () => {
  return (
    <Router basename='/wallet-team-project'>
      <div>
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
