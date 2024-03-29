import Media from 'react-media';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/navigation';
import TotalBalanceComponent from 'components/Balance/Balance';
import HomeTab from 'components/HomeTab/HomeTab';
import CurrencyComponent from 'components/Currency/Currency';

import styles from './HomePage.module.css';

export const Home = () => (
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
                <HomeTab />
              </div>
            </div>
          </>
        )}
      />
    </>
  </>
);
