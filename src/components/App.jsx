import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './Route/ProtectedRoute';
import { RestrictedRoute } from './Route/RestrictedRoute';
// import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import { Home } from 'pages/HomePage/HomePage';
import { Diagram } from 'pages/StatisticsPage/StatisticsPage';
import { Currency } from 'pages/CurrencyPage/CurrencyPage';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);

export const App = () => {
  return (
    <Router basename="/wallet-team-project">
      <div>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <RestrictedRoute redirectTo="/home" component={<LoginPage />} />
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
          <Route
            path="/home"
            element={
              <ProtectedRoute
                component={<DashboardPage />}
                redirectTo={'/login'}
              />
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute component={<Home />} redirectTo={'/login'} />
            }
          />
          <Route
            path="/diagram"
            element={
              <ProtectedRoute component={<Diagram />} redirectTo={'/login'} />
            }
          />
          <Route
            path="/currency"
            element={
              <ProtectedRoute component={<Currency />} redirectTo={'/login'} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
