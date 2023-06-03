import { useEffect, useState } from 'react';
//import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import ChartDiagram from './ChartDiagram/ChartDiagram';
import Calendar from './Calendar/Calendar';
import StatisticsTable from './StatisticsTable/StatisticsTable';

import css from './StatisticsContainer.module.css';

const StatisticContainer = () => {
  //   const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [month, setMonth] = useState(1); //Daty z zrobionego datepickera, koniecznie numbery
  const [year, setYear] = useState(2000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!year) {
          return;
        }
        const response = await axios.get(
          `https://wallet-dybb.onrender.com/api/transactions-summary?year=${year}&month=${month}`
        );
        setData(response.data.data.response);
      } catch (error) {
        // Handle error case
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [year, month]);


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
      <div className={css.diagramContainer}>
      <h1>Statistics</h1>
      <ChartDiagram statistic={MakeStatistic()} />
      </div>
      <div className={css.tableContainer}>
        <Calendar setMonthAmount={setMonth} setYearAmount={setYear} />
        <StatisticsTable statistic={data} />
      </div>
    </div>
  );
};

export default StatisticContainer;