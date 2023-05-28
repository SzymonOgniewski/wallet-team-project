import React from 'react';
import { useSelector } from 'react-redux';
import styles from './BalanceComponent.module.css';

const TotalBalanceComponent = () => {
  const totalBalance = useSelector(state => state.finance.totalBalance);
  const formattedBalance = totalBalance
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, '\u00A0'); // Replace commas with non-breaking spaces

  return (
    <div className={styles.group11}>
      <div className={styles.overlapGroup}>
        <div
          className={`${styles.yourBalance} ${styles.circeRegularNormalQuickSilver12px}`}
        >
          <span className={styles.circeRegularNormalQuickSilver12px}>
            Your balance
          </span>
        </div>
        <h1
          className={`${styles.phone} ${styles.valignTextMiddle} ${styles.poppinsNormalBlack30px}`}
        >
          <span>
            <span className={styles.poppinsBoldBlack30px}>₴ </span>
            <span className={styles.poppinsBoldBlack30px}>
              {formattedBalance}
            </span>
          </span>
        </h1>
      </div>
    </div>
  );
};

export default TotalBalanceComponent;
