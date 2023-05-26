import React, { useEffect, useState } from 'react';
import styles from './CurrencyComponent.module.css';
import Vector7 from './vector7.png';

function CurrencyComponent() {
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedResponse = localStorage.getItem('currencyData');
        const storedTimestamp = localStorage.getItem('timestamp');

        if (storedResponse && storedTimestamp && !isExpired(storedTimestamp)) {
          setCurrencyData(JSON.parse(storedResponse));
        } else {
          const usdResponse = await fetch(
            'http://api.nbp.pl/api/exchangerates/rates/c/usd/today/'
          );
          const usdData = await usdResponse.json();

          const eurResponse = await fetch(
            'http://api.nbp.pl/api/exchangerates/rates/c/eur/today/'
          );
          const eurData = await eurResponse.json();

          const data = {
            usd: usdData.rates[0],
            eur: eurData.rates[0],
          };

          localStorage.setItem('currencyData', JSON.stringify(data));
          localStorage.setItem('timestamp', new Date().toString());

          setCurrencyData(data);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
      }
    };

    fetchData();
  }, []);

  function isExpired(lastRequestDate) {
    const now = new Date();
    const expirationTime = new Date(lastRequestDate);
    expirationTime.setHours(expirationTime.getHours() + 1);
    return now > expirationTime;
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
          {Object.entries(currencyData).map(([currencyCode, currency]) => (
            <div className={styles.flexRow} key={currencyCode}>
              <div className={styles.price}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {currencyCode.toUpperCase()}
                </span>
              </div>
              <div className={styles.text1}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {currency.bid.toFixed(2)}
                </span>
              </div>
              <div className={styles.text3}>
                <span className={styles.circeRegularNormalWhite16px}>
                  {currency.ask.toFixed(2)}
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

