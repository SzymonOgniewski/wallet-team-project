import React, { useEffect } from 'react';
import css from './StatisticsTable.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionsSummary } from '../../../redux/transactions/transactionThunk';

const StatisticsTable = () => {
  const dispatch = useDispatch();


  
  const income = useSelector(state => state.transactions.summary.incomeSummary);
  
  const expenses = useSelector(state => state.transactions.summary.expenseSummary);
 
  let transactionsSummary = useSelector(
    state => state.transactions.summary.categoriesSummary
  );
  if (!transactionsSummary) transactionsSummary = [];
  useEffect(() => {
    dispatch(fetchTransactionsSummary({ year: 2023, month: '6' }));
  }, [dispatch]);

  const tab = [
    { title: 'Income', value: 8700, color: '#24CCA7' },
    { title: 'default transaction', value: 8700, color: '#808080' },
    { title: 'Main expenses', value: 8700, color: '#FED057' },
    { title: 'Products', value: 3800, color: '#FFD8D0' },
    { title: 'Car', value: 1500, color: '#FD9498' },
    { title: 'Self care', value: 800, color: '#C5BAFF' },
    { title: 'Child care', value: 2200, color: '#6E78E8' },
    { title: 'Household products', value: 300, color: '#4A56E2' },
    { title: 'Education', value: 3400, color: '#81E1FF' },
    { title: 'Leisure', value: 123, color: '#8A2BE2' },
    { title: 'Other expenses', value: 610, color: '#00AD84' },
    {
      _id: '6471096a9af3d469961187ef',
      title: 'Entertainment',
      type: 'EXPENSE',
      color: '#9AFA41',
    },
  ];

  const getTitleColor = title => {
    const item = tab.find(item => item.title === title);
    return item ? item.color : 'red';
  };

  return (
    <div>
      <table className={css.transactionHistory}>
        <thead>
          <tr className={css.tr}>
            <th className={`${css.categoryTh} ${css.th}`}>
              <div className={css.categoryTitleWrapper}>
                <p className={css.categoryTitle}>Category</p>
              </div>
            </th>
            <th className={`${css.sumTh} ${css.th}`}>
              <div className={css.sumTitleWrapper}>
                <p className={css.sumTitle}>Sum</p>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {transactionsSummary.map((item, index) => (
            <tr key={index} className={css.tr}>
              <td className={css.td}>
                <div className={css.statisticWrappers}>
                  <div
                    className={css.statisticColors}
                    style={{ backgroundColor: getTitleColor(item.name) }}
                  ></div>
                  <p className={css.categoryText}>{item.name}</p>
                </div>
              </td>

              <td className={css.td}>
                <div className={css.categoryWrappers}>
                  <p className={css.categoryValue}>{item.total}</p>
                </div>
              </td>
            </tr>
          ))}

          <tr className={css.tr}>
            <td className={css.td}>
              <p className={css.incomeText}>Expenses:</p>
            </td>
            <td className={css.td}>
              <div className={css.valueWrapp}>
                <p className={css.expensesValue}>{expenses}</p>
              </div>
            </td>
          </tr>

          <tr className={css.tr}>
            <td className={css.td}>
              <p className={css.incomeText}>Income:</p>
            </td>
            <td className={css.td}>
              <div className={css.valueWrapp}>
                <p className={css.incomeValue}>{income}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatisticsTable;