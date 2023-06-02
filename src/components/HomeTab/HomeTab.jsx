import React, { useEffect } from 'react';
import styles from './HomeTabComponent.module.css';
import edit from './edit.png';

import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTransactions,  
  deleteSelectedTransaction,
} from '../../redux//transactions/transactionThunk';

const HomeTab = () => {
  const data = useSelector(state => state.transactions.items);
  const dispatch = useDispatch();

  const handleDelete = transactionId => {
    dispatch(deleteSelectedTransaction(transactionId));
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={styles.group306}>
      <div
        className={`${styles.navbarLinkContainer} ${styles.circeBoldBlack18px}`}
      >
        <div className={styles.navbarLinkPlace}>
          <span className={styles.circeBoldBlack18px}>Date</span>
        </div>
        <div className={styles.navbarLinkType}>
          <span className={styles.circeBoldBlack18px}>Type</span>
        </div>
        <div className={styles.navbarLinkCategory}>
          <span className={styles.circeBoldBlack18px}>Category</span>
        </div>
        <div className={styles.navbarLinkComment}>
          <span className={styles.circeBoldBlack18px}>Comment</span>
        </div>
        <div className={styles.navbarLinkSum}>
          <span className={styles.circeBoldBlack18px}>Sum</span>
        </div>

        <div className={styles.navbarLinkDelete}>
          <span className={styles.circeBoldBlack18pxDelete}>Delete</span>
        </div>
      </div>
      <div className={styles.navHeight}>
        {data.length === 0 ? (
          <div className={styles.noData}>No transactions found.</div>
        ) : (
          data.map((item, index) => (
            <div className={styles.navbar1} key={index}>
              <div
                className={`${styles.navbarLinkDate1} ${styles.circeRegularNormalBlack16px}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {item.transactionDate}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkText1} ${styles.circeRegularNormalBlack16px}`}
              >
                <span className={`${styles.circeRegularNormalBlack16px} `}>
                  {item.type === 'income' ? '+' : '-'}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkOther} ${
                  styles.circeRegularNormalBlack16px
                } ${item.type === 'income' ? styles.plus : ''}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {item.category}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkGiftForYourWife} ${styles.circeRegularNormalBlack16px}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {item.comment}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkPhone} ${styles.circeRegularNormalBlack16px}`}
              >
                <span
                  className={
                    item.type === 'income'
                      ? `${styles.circeBoldCaribbeanGreen16px}`
                      : `${styles.circeBoldStrawberry16px}`
                  }
                >
                  {item.amount
                    .toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    .replace(/,/g, '\u00A0')}
                </span>
              </div>
              <img className={styles.edit} onClick={() => console.log("modal edit open")} src={edit} alt="Vector 18" />
              <div className={styles.btn} onClick={() => handleDelete(item.id)}>
                <div
                  className={`${styles.delete} ${styles.circeRegularNormalWhite14px}`}
                >
                  <span className={styles.circeRegularNormalWhite14px}>
                    Delete
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeTab;
