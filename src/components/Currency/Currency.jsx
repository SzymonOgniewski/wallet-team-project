import React, { useEffect, useState } from 'react';
import styles from './CurrencyComponent.module.css';
import Vector7 from './vector7.png';
//import { getTransactions } from 'redux/transactions/TransactionSelectors';
// const isLoading = useSelector(getIsLoading);
// const dispatch = useDispatch();
// const transactions = useSelector(getTransaction); tutaj pobieramy dane ze stora
function CurrencyComponent() {
  const test = {
    USD: {
      purchase: 27.55,
      sale: 27.65,
    },
    EUR: {
      purchase: 38.21,
      sale: 30.18,
    },
  };

  const [currencyData, setCurrencyData] = useState(null);


  useEffect(() => {
    fetchData();
  });

  function isExpired(lastRequestDate) {
    const now = new Date();
    const expirationTime = new Date(lastRequestDate);
    expirationTime.setHours(expirationTime.getHours() + 1);
    return now > expirationTime;
  }

  async function fetchData() {
    try {
      const storedResponse = localStorage.getItem('currencyData');
      const storedTimestamp = localStorage.getItem('timestamp');

      if (storedResponse && storedTimestamp && !isExpired(storedTimestamp)) {
        // const data = JSON.parse(storedResponse);
        setCurrencyData(test);
      } else {
        // const response = await fetch('URL_DO_API');
        // const data = await response.json();

        localStorage.setItem('currencyData', JSON.stringify(test));
        localStorage.setItem('timestamp', new Date().toString());

        setCurrencyData(test);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
    }
  }

  function renderData() {
    if (!currencyData) {
      return <p>Ładowanie danych...</p>;
    }

    return (
      <div className={styles.group}>
        <div className={styles.overlapGroup}>
          <div
            className={`${styles.overlapGroup1} ${styles.circeBoldWhite18px}`}
          >
            <div className={styles.currency}>
              <span className={styles.circeBoldWhite18px}>Currency</span>
            </div>
            <div className={styles.place}>
              <span className={styles.circeBoldWhite18px}>Purchase</span>
            </div>
            <div className={styles.place1}>
              <span className={styles.circeBoldWhite18px}>Sale</span>
            </div>
          </div>
          {Object.keys(currencyData).map(currency => (
            <div className={styles.flexRow} key={currency}>
              <div className={styles.price}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {currency}
                </span>
              </div>
              <div className={styles.text1}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {test[currency].purchase}
                </span>
              </div>
              <div className={styles.text3}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {test[currency].sale}
                </span>
              </div>
            </div>
          ))}
          <img className={styles.vector7} src={Vector7} alt="Vector 7" />
        </div>
      </div>
    );
  }

  return <div>{renderData()}</div>;
}

export default CurrencyComponent;
