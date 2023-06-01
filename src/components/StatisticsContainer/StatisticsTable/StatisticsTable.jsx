import { useSelector } from 'react-redux';
import { getDetailsIncome, getDetailsExpense } from 'redux/transactions/transactionSelectors';

import css from './StatisticsTable.module.css';

const StatisticsTable = ({ statistic }) => {
  const income = useSelector(getDetailsIncome);
  const expenses = useSelector(getDetailsExpense);

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
          
          {statistic.map(item => (
            <tr key={item.color} className={css.tr}>

              <td className={css.td}>
                <div className={css.statisticWrappers}>
                  <div
                    className={css.statisticColors}
                    css={{ backgroundColor: item.color }}
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