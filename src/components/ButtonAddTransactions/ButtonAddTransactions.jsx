import styles from './ButtonAddTransactions.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export function ButtonAddTransactions() {

  return (
    <>
      <button
        className={styles.addButton}
        type="button"
        aria-label="add transaction button"
        // onClick={handleClick}
      >
        {' '}
        <BsFillPlusCircleFill
          size={44}
          style={{
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#fff',
          }}
        />
      </button>
    </>
  );
}
