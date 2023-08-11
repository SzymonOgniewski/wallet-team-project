import React, { useEffect } from 'react';
import styles from './HomeTabComponent.module.css';
import edit from './edit.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoading } from 'redux/transactions/transactionSelectors';
import {
  fetchTransactions,
  deleteSelectedTransaction,
} from '../../redux/transactions/transactionThunk';
import { toggleTransactionEditModal } from 'redux/data/globalSlice';
import { getIsEditTransactionModalOpen } from 'redux/Selectors';
import EditTransaction from 'components/EditTransaction/EditTransaction';

import { Box, Spinner, AbsoluteCenter } from '@chakra-ui/react';

const HomeTab = () => {
  let data = useSelector(state => state.transactions.items.userTransactions);
  const isLoading = useSelector(getIsLoading);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  if (!data) data = [];
  const dispatch = useDispatch();
  const handleDelete = transactionId => {
    dispatch(deleteSelectedTransaction(transactionId));
  };
  const isTransactionEditModalOpen = useSelector(getIsEditTransactionModalOpen);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as per your requirements
  console.log(data);
  return (
    <div className={styles.group306}>
      {isMobile ? (
        data.length === 0 ? (
          <p className={styles.noData}>No transactions found.</p>
        ) : (
          data.map(item => (
            <div key={item._id} className={styles.mobileTableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr className={styles.tableHeaderRow}>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18px}>Date</span>
                    </th>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18px}>Type</span>
                    </th>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18px}>
                        Category
                      </span>
                    </th>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18px}>Comment</span>
                    </th>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18px}>Sum</span>
                    </th>
                    <th className={styles.tableHeaderCell}>
                      <span className={styles.circeBoldBlack18pxDelete}>
                        Delete
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.tableRow} key={item._id}>
                    <td className={styles.tableCell}>
                      <span className={styles.circeRegularNormalBlack16px}>
                        {new Date(item.date).toLocaleDateString('pl-PL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className={`${styles.tableCell} ${styles.center}`}>
                      <span
                        className={`${styles.circeRegularNormalBlack16px} `}
                      >
                        {item.type === 'INCOME' ? '+' : '-'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.circeRegularNormalBlack16px}>
                        {item.categoryName ? item.categoryName : 'Other'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.circeRegularNormalBlack16px}>
                        {item.comment ? item.comment : 'No comment'}
                      </span>
                    </td>
                    <td className={styles.tableCell}>
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
                    </td>
                    <td className={styles.tableCell}>
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
                        {isTransactionEditModalOpen &&
                          selectedTransactionId === item._id && (
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
                            <span
                              className={styles.circeRegularNormalWhite14px}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        )
      ) : (
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeaderRow}>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18px}>Date</span>
              </th>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18px}>Type</span>
              </th>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18px}>Category</span>
              </th>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18px}>Comment</span>
              </th>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18px}>Sum</span>
              </th>
              <th className={styles.tableHeaderCell}>
                <span className={styles.circeBoldBlack18pxDelete}>Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td className={styles.noData} colSpan="6">
                  <span className={styles.circeBoldBlack18px}>
                    No transactions found.
                  </span>
                </td>
              </tr>
            ) : (
              data.map(item => (
                <tr className={styles.tableRow} key={item._id}>
                  <td className={styles.tableCell}>
                    <span className={styles.circeRegularNormalBlack16px}>
                      {new Date(item.date)
                        .toLocaleDateString('pl-PL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                        .replace(/\//g, '.')}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.center}`}>
                    <span className={`${styles.circeRegularNormalBlack16px} `}>
                      {item.type === 'INCOME' ? '+' : '-'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.circeRegularNormalBlack16px}>
                      {item.categoryName ? item.categoryName : 'Other'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.circeRegularNormalBlack16px}>
                      {item.comment ? item.comment : 'No comment'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
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
                  </td>
                  <td className={styles.tableCell}>
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
                      {isTransactionEditModalOpen &&
                        selectedTransactionId === item._id && (
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
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {isLoading && (
        <Box position="relative" h="100px">
          <AbsoluteCenter p="48" color="white" axis="both">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </AbsoluteCenter>
        </Box>
      )}
    </div>
  );
};

export default HomeTab;
