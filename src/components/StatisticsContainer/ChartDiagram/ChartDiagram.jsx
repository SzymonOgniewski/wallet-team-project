import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserBalance } from 'redux/auth/AuthSelectors';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import css from './ChartDiagram.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartDiagram = ({ arrForRenderDonat }) => {
  const balance = useSelector(getUserBalance);

  const optionsChart = { plugins: { tooltip: true } };
  const [options, setOptionsChart] = useState(optionsChart);

  const [data, setData] = useState({
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 5, 4, 3],
        backgroundColor: [
          '#FED057',
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
        borderColor: [
          '#FED057',
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

        cutout: 90,
        hoverBorderWidth: 5,
      },
    ],
  });

  useEffect(() => {
    if (arrForRenderDonat.length) {
      const newData = {
        datasets: [
          {
            data: arrForRenderDonat,
            backgroundColor: [
              '#FED057',
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
            borderColor: [
              '#FED057',
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

            cutout: 90,
            hoverBorderWidth: 5,
          },
        ],
      };

      const newOptionsChart = { plugins: { tooltip: true } };
      setOptionsChart(newOptionsChart);
      setData(newData);
    } else {
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

      const newOptionsChart = { plugins: { tooltip: false } };
      setOptionsChart(newOptionsChart);
      setData(newData);
    }
  }, [arrForRenderDonat]);

  return (
    <div className={css.diagram}>
      <Doughnut data={data} options={options} />
      <p className={css.sumExpensesIntoDiagram}>{balance.toFixed(2)}</p>
    </div>
  );
};

export default ChartDiagram;