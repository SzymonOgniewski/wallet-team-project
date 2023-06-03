import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance } from '../../redux/finance/financeThunks';
import styles from './BalanceComponent.module.css';
import { refreshUser } from 'redux/auth/AuthThunk';

const TotalBalanceComponent = () => {
  const dispatch = useDispatch();
  let totalBalance = useSelector(state => state.finance.balance);  
  if (!totalBalance) totalBalance = 0;
  const formattedBalance = totalBalance
    .toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(/,/g, '\u00A0');

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchBalance());
  }, [dispatch]);

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
