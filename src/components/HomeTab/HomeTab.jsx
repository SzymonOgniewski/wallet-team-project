import React, { useEffect } from 'react';
import styles from './HomeTabComponent.module.css';
import edit from './edit.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchTransactions,
  deleteSelectedTransaction,
} from '../../redux//transactions/transactionThunk';
import { toggleTransactionEditModal } from 'redux/data/globalSlice';
import { getIsEditTransactionModalOpen } from 'redux/Selectors';
import EditTransaction from 'components/EditTransaction/EditTransaction';
import { getTransactions } from 'redux/transactions/transactionSelectors';

const HomeTab = () => {
  let data = useSelector(state => state.transactions.items.userTransactions);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  if (!data) data = [];
  const dispatch = useDispatch();
  const handleDelete = transactionId => {
    dispatch(deleteSelectedTransaction(transactionId));
  };  
  const isTransactionEditModalOpen = useSelector(getIsEditTransactionModalOpen);
  const transactions = useSelector(getTransactions);
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
          <div className={`${styles.noData} ${styles.circeBoldBlack18px}`}>
            No transactions found.
          </div>
        ) : (
          data.map(item => (
            <div className={styles.navbar1} key={item._id}>
              <div
                className={`${styles.navbarLinkDate1} ${styles.circeRegularNormalBlack16px}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {new Date(item.transactionDate)
                    .toLocaleDateString('pl-PL', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                    .replace(/\//g, '.')}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkText1} ${styles.circeRegularNormalBlack16px}`}
              >
                <span
                  className={`${styles.circeRegularNormalBlack16px} ${styles.left}`}
                >
                  {item.type === 'INCOME' ? '+' : '-'}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkOther} ${
                  styles.circeRegularNormalBlack16px
                } ${item.type === 'INCOME' ? styles.plus : ''}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {item.categoryName ? item.categoryName : 'Other'}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkGiftForYourWife} ${styles.circeRegularNormalBlack16px}`}
              >
                <span className={styles.circeRegularNormalBlack16px}>
                  {item.comment ? item.comment : 'No comment'}
                </span>
              </div>
              <div
                className={`${styles.navbarLinkPhone} ${styles.circeRegularNormalBlack16px}`}
              >
                <span
                  className={
                    item.type === 'INCOME'
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
              <div className={styles.editionsGroup}>
                <img
                  id={item._id}
                  className={styles.edit}
                  onClick={e => {
                    setSelectedTransactionId(e.target.id);
                    dispatch(toggleTransactionEditModal());
                  }}
                  src={edit}
                  alt="Vector 18"
                />
                {isTransactionEditModalOpen && selectedTransactionId && (
                  <EditTransaction
                    transactionId={selectedTransactionId}
                    closeModal={() => {
                      setSelectedTransactionId(null);
                      dispatch(toggleTransactionEditModal());
                    }}
                  />
                )}
                <div
                  className={styles.btn}
                  onClick={() => handleDelete(item._id)}
                >
                  <div
                    className={`${styles.delete} ${styles.circeRegularNormalWhite14px}`}
                  >
                    <span className={styles.circeRegularNormalWhite14px}>
                      Delete
                    </span>
                  </div>
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
