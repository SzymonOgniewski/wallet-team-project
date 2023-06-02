import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { useState } from 'react';

import css from './Calendar.module.css';
import arrow from './images/Vector.png';

const Calendar = ({ setMonthAmount, setYearAmount }) => {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(true);

  const toggleMonth = () => {
    setMonth(!month);
    setYear(false);
  };

  const toggleYear = () => {
    setYear(!year);
    setMonth(false);
  };

  const onMonthChange = e => {
    let choosenOne = e._d.getMonth() + 1;
    if (choosenOne < 10) {
      choosenOne = '0' + choosenOne;
    }
    console.log(choosenOne.toString());
    setMonthAmount(choosenOne.toString());
  };

  const onYearChange = e => {
    const choosenOne = e._d.getFullYear().toString();
    setYearAmount(choosenOne);
    console.log(choosenOne.toString());
  };

  const isValidData = data => {
    const currentDate = new Date();
    return currentDate > data._d;
  };

  const toggleCalendar = e => {
    const classTable = e.target.getAttribute('class');

    if (classTable === 'rdtMonth') {
      setOpenCalendar(false);
    } else if (classTable === 'rdtYear') {
      setOpenCalendar(false);
    } else {
      setOpenCalendar(true);
    }
  };

  return (
    <div onClick={toggleCalendar} className={css.wrappCalendar}>
      <div>
        <div onClick={toggleMonth} className={css.wrapperMonth}>
          <p className={css.calendarText}>Month</p>
          <img src={arrow} alt=">" />
        </div>
        {month && (
          <Datetime
            open={openCalendar}
            closeOnSelect={true}
            timeFormat={false}
            dateFormat="MM"
            onChange={onMonthChange}
            isValidDate={isValidData}
            className={css.datetime}
            input={false}
          />
        )}
      </div>

      <div>
        <div
          onClick={toggleYear}
          className={`${css.wrapperMonth} ${css.wrapperYear}`}
        >
          <p className={css.calendarText}>Year</p>
          <img src={arrow} alt=">" />
        </div>
        {year && (
          <Datetime
            open={openCalendar}
            closeOnSelect={true}
            className={css.datetime}
            dateFormat="YYYY"
            timeFormat={false}
            onChange={onYearChange}
            isValidDate={isValidData}
            input={false}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;