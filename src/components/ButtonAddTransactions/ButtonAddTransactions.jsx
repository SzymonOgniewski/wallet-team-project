import styles from './ButtonAddTransactions.module.css';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTransactionModal } from '../../redux/data/globalSlice';
import { getIsTransactionModalOpen } from 'redux/Selectors';
import AddTransaction from 'components/AddTransaction/AddTransaction';

export function ButtonAddTransactions() {
  const dispatch = useDispatch();
  const isTransactionModalOpen = useSelector(getIsTransactionModalOpen);

  return (
    <>
      <button
        className={styles.addButton}
        type="button"
        aria-label="add transaction button"
        onClick={() => {
          dispatch(toggleTransactionModal());
        }}
      >
        <BsFillPlusCircleFill
          size={44}
          style={{
            borderRadius: '50%',
            border: 'none',
            backgroundColor: '#fff',
          }}
        />
      </button>
      {isTransactionModalOpen && (
        <AddTransaction
          closeModal={() => {
            dispatch(toggleTransactionModal());
          }}
        />
      )}
    </>
  );
}
