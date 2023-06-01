import React, { lazy, Suspense } from 'react';
import Media from 'react-media';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import TotalBalanceComponent from './Balance/Balance';
import Navigation from './Navigation/navigation';
import CurrencyComponent from './Currency/Currency';
// import { ButtonAddTransactions } from './ButtonAddTransactions/ButtonAddTransactions';
import HomeTab from './HomeTab/HomeTab';
import styles from './AppComponent.module.css';

const LoginPage = lazy(() => import('../pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(() =>
  import('../pages/RegistrationPage/RegistrationPage')
);
const Home = () => (
  <>
    <Media
      query="(max-width: 767px)"
      render={() => (
        <>
          <Header />
          <Navigation />
          <TotalBalanceComponent />
          <HomeTab />
        </>
      )}
    />

    <>
      <Media
        query="(min-width: 768px) and (max-width: 1279px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div>
                <Navigation />
                <TotalBalanceComponent />
              </div>
              <div>
                <CurrencyComponent />
              </div>
            </div>
            <div className={styles.homeTab}>
              <HomeTab />
            </div>
          </>
        )}
      />
    </>
    <>
      <Media
        query="(min-width: 1280px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div className={styles.leftBlock}>
                <Navigation />
                <TotalBalanceComponent />
                <CurrencyComponent />
              </div>
              <div>
                {' '}
                <HomeTab />
              </div>
            </div>
          </>
        )}
      />
    </>
  </>
);
const Diagram = () => (
  <>
    <Media
      query="(max-width: 767px)"
      render={() => (
        <>
          <Header />
          <Navigation />
          <h1>Diagram Page</h1>
        </>
      )}
    />

    <>
      <Media
        query="(min-width: 768px) and (max-width: 1279px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div>
                <Navigation />
                <TotalBalanceComponent />
              </div>
              <div>
                <CurrencyComponent />
              </div>
            </div>
            <div className={styles.homeTab}>
              <h1>Diagram Page</h1>
            </div>
          </>
        )}
      />
    </>
    <>
      <Media
        query="(min-width: 1280px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div>
                <Navigation />
                <TotalBalanceComponent />
                <CurrencyComponent />
              </div>
              <div>
                <h1>Diagram Page</h1>
              </div>
            </div>
          </>
        )}
      />
    </>
  </>
);

const Currency = () => (
  <>
    <Media
      query="(max-width: 767px)"
      render={() => (
        <>
          <Header />
          <Navigation />
          <CurrencyComponent />
        </>
      )}
    />
    <>
      <Media
        query="(min-width: 768px) and (max-width: 1279px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div>
                <Navigation />
                <TotalBalanceComponent />
              </div>
              <div>
                <CurrencyComponent />
              </div>
            </div>
            <div className={styles.homeTab}>
              <HomeTab />
            </div>
          </>
        )}
      />
    </>
    <>
      <Media
        query="(min-width: 1280px)"
        render={() => (
          <>
            <Header />
            <div className={styles.blocks}>
              <div>
                <Navigation />
                <TotalBalanceComponent />

                <CurrencyComponent />
              </div>
              <div>
                {' '}
                <HomeTab />
              </div>
            </div>
          </>
        )}
      />
    </>
  </>
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
