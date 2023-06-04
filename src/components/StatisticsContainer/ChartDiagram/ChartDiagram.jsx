import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import css from './ChartDiagram.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDiagram = () => {
  const balance = useSelector(state => state.finance.balance);

  const optionsChart = { plugins: { tooltip: true } };
  const [options, setOptionsChart] = useState(optionsChart);
  let transactionsSummary = useSelector(
    state => state.transactions.summary.categoriesSummary
  );
  console.log(transactionsSummary);

  const totals = [];
  transactionsSummary?.forEach(item => {
    totals.push(item.total);
  });

  const names = [];
  transactionsSummary?.forEach(item => {
    names.push(item.name);
  });

  // Display totals in a new table

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
  ];

  const getTitleColor = title => {
    const item = tab.find(item => item.title === title);
    return item ? item.color : 'red';
  };
const colors = [];
names.forEach(item => {
  const color = getTitleColor(item);
  colors.push(color);
});



  const [data, setData] = useState({
    datasets: [
      {
        data: totals,
        backgroundColor: [
          getTitleColor(),
          '#FFD8D0',
          '#FD9498',
          '#C5BAFF',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#24CCA7',
          '#00AD84',
          '#FF6596',
          '#000000',
          '#FFFFFF',
          '#A6A6A6',
          '#BDBDBD',
        ],
        borderWidth: 0,
        cutout: 90,
        hoverBorderWidth: 5,
      },
    ],
  });

  const set = {
    datasets: [
      {
        data: totals,
        backgroundColor:colors,
        borderWidth: 0,
        cutout: 90,
        hoverBorderWidth: 5,
      },
    ],
  };

  console.log(data);

  // useEffect(() => {
  //   if (transactionsSummary) {
  //     const newData = {
  //       datasets: [
  //         {
  //           data: transactionsSummary,
  //           backgroundColor: [
  //             '#FED057',
  //             '#FFD8D0',
  //             '#FD9498',
  //             '#C5BAFF',
  //             '#6E78E8',
  //             '#4A56E2',
  //             '#81E1FF',
  //             '#24CCA7',
  //             '#00AD84',
  //             '#FF6596',
  //             '#000000',
  //             '#FFFFFF',
  //             '#A6A6A6',
  //             '#BDBDBD',
  //           ],
  //           borderWidth: 0,
  //           cutout: 90,
  //           hoverBorderWidth: 5,
  //         },
  //       ],
  //     };

    
      const newData = {
        datasets: [
          {
            label: 'You are have not expenses in current period',
            data: [0.01],
            backgroundColor: ['#C5BAFF'],
            borderColor: ['#C5BAFF'],
            cutout: 90,
            hoverBorderWidth: 5,
            labelTextColors: '#00AD84',
          },
        ],
        labelTextColors: '#00AD84',
      };

 

  return (
    <div className={css.diagram}>
      <Doughnut
        data={transactionsSummary?.length === 0 ? newData : set}
        options={options}
      />
      <p className={css.sumExpensesIntoDiagram}>
        ₴{' '}
        {balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default ChartDiagram;
