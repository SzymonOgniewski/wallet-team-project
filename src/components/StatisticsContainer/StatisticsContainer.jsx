import { useEffect, useState } from 'react';
//import { useDispatch, useSelector } from 'react-redux';


import ChartDiagram from './ChartDiagram/ChartDiagram';
import Calendar from './Calendar/Calendar';
import StatisticsTable from './StatisticsTable/StatisticsTable';

import css from './StatisticsContainer.module.css';

const StatisticContainer = () => {
//   const dispatch = useDispatch();  

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
//   useEffect(() => {
//     if (month !== '' && year !== '') {
//       const params = {
//         month,
//         year,
//       };
//       dispatch();
//     }
//   }, [month, year]);

//   useEffect(() => {
//     dispatch();
//   }, [dispatch]);

  const MakeStatistic = (categories, details) => {
    if (categories && details) {
      const statistic = categories.map(category => {
        const value = details.find(detail => detail.category === category.name);
        if (!value) {
          return { title: category.name, value: 0, color: category.color };
        }
        return {
          title: category.name,
          value: value.sum,
          color: category.color,
        };
      });
      return statistic;
    }
    return [];
  };

  return (
    <div className={css.container}>
      <ChartDiagram statistic={MakeStatistic()} />
      <div className={css.tableContainer}>
        <Calendar setMonthAmount={setMonth} setYearAmount={setYear} />
        <StatisticsTable statistic={MakeStatistic()} />
      </div>
    </div>
  );
};

export default StatisticContainer;