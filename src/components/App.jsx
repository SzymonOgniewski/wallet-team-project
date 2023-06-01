import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
import TotalBalanceComponent from './Balance/Balance';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import Header from "./Header/Header";
import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import { lazy } from 'react';
const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));

const Home = () => <h1>Home Page</h1>;
const Diagram = () => <h1>Statictic Page</h1>;
const Currency = () => <CurrencyComponent />;

export const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <TotalBalanceComponent />
        <ButtonAddTransactions />
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

