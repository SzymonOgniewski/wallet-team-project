import { useSelector } from 'react-redux';
import {
  getDetailsIncome,
  getDetailsExpense,
} from 'redux/transactions/transactionSelectors';

import css from './StatisticsTable.module.css';
import { red } from '@mui/material/colors';

const StatisticsTable = ({ statistic }) => {
  const income = statistic.incomeSummary;
  const expenses = statistic.expenseSummary;

      
  const tableForMap = statistic.categoriesSummary

  //Mock tabela widzać że działa i ładnie się wyświetla
  const tab = [
    { color: 'red', title: 'car', value: 157 },
    { color: 'green', title: 'gift', value: 3570 },
    { color: 'yellow', title: 'bonus', value: 57 },
    { color: 'blue', title: 'other', value: 2357 },
  ];

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
          {tab.map(item => (
            <tr key={item.color} className={css.tr}>
              <td className={css.td}>
                <div className={css.statisticWrappers}>
                  <div
                    className={css.statisticColors}
                    style={{ backgroundColor: item.color }} // Kolor można próbować dodać do tabeli albo renderować np na podstawie typu
                  ></div>
                  <p className={css.categoryText}>{item.title}</p>
                </div>
              </td>

              <td className={css.td}>
                <div className={css.categoryWrappers}>
                  <p className={css.categoryValue}>{item.value}</p>
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
