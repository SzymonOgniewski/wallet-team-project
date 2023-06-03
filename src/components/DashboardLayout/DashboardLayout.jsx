import { useLocation } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
import { useDeviceSize } from 'hooks/useDeviceSize';
import Header from 'components/Header/Header';
import Navigation from 'components/Navigation/navigation';
import TotalBalanceComponent from 'components/Balance/Balance';
import CurrencyComponent from 'components/Currency/Currency';

function DashboardLayout({ children }) {
  const { deviceType } = useDeviceSize();
  const location = useLocation();
  if (deviceType === 'mobile') {
    return (
      <div className={styles.backWrapper}>
        <div className={styles.dashboard}>
          <Header />
          <div className={styles.dashboard__content}>
            <div className={styles.dashboard__navigation}>
              <Navigation />
            </div>
            {location.pathname === '/home' && (
              <div className={styles.dashboard__balance}>
                <TotalBalanceComponent />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.backWrapper}>
      <div className={styles.dashboard}>
        <Header />
        <div className={styles.dashboard__content}>
          <div className={styles.dashboard__left}>
            <div className={styles.dashboard__navigation}>
              <Navigation />
            </div>
            {deviceType === 'mobile' ? (
              location.pathname === '/home' && (
                <div className={styles.dashboard__balance}>
                  <TotalBalanceComponent />
                </div>
              )
            ) : (
              <div className={styles.dashboard__balance}>
                <TotalBalanceComponent />
              </div>
            )}
            {deviceType === 'desktop' && (
              <div className={styles.dashboard__currency}>
                <CurrencyComponent />
              </div>
            )}
          </div>
          <div className={styles.dashboard__right}>
            {deviceType === 'desktop' ? (
              children
            ) : (
              <div className={styles.dashboard__currency}>
                <CurrencyComponent />
              </div>
            )}
          </div>
          {deviceType !== 'desktop' && children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;