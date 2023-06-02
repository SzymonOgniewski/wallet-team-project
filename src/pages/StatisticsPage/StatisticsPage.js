import Media from 'react-media';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/navigation';
import TotalBalanceComponent from 'components/Balance/Balance';
import CurrencyComponent from 'components/Currency/Currency';
import StatisticContainer from 'components/StatisticsContainer/StatisticsContainer';

import styles from './StatisticsPage.module.css';

export const Diagram = () => (
  <>
    <Media
      query="(max-width: 767px)"
      render={() => (
        <>
          <Header />
          <Navigation />
          <StatisticContainer />
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
              <StatisticContainer />
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
                <StatisticContainer />
              </div>
            </div>
          </>
        )}
      />
    </>
  </>
);
