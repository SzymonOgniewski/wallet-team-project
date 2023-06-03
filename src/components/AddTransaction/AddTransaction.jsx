import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import { toast } from 'react-toastify';
import 'react-datetime/css/react-datetime.css';
import Switch from 'react-switch';
import css from './AddTransaction.module.css';
import { useCallback } from 'react';
import { getTransactionCategories } from 'redux/transactions/transactionThunk';
import { getCategories } from 'redux/transactions/transactionSelectors';

const modalRoot = document.querySelector('#modal-logout-root');

const AddTransaction = ({ closeModal }) => {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(checked => {
    setChecked(checked);
  }, []);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);
  const handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const initialValues = {
    amount: '',
    date: new Date(),
    transactionType: '',
    comment: '',
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Amount is required'),
    date: Yup.date(),
    transactionType: Yup.string(),
  });

  return createPortal(
    <div className={css.ExitModal} onClick={handleBackdropClose}>
      <div className={css.ExitModalContent}>
        <h2>Add Transaction</h2>
        <Switch checked={checked} onChange={handleChange} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {checked && (
                <div>
                  <label>category</label>
                  <Field as="select" name="transactionCategory">
                    {categories?.map(category => {
                      category.name === 'default transaction' && (
                        <option key={category._id} id={category._id}>
                          Choose category
                        </option>
                      );
                    })}
                  </Field>
                </div>
              )}
              <div>
                <label>Kwota:</label>
                <Field type="number" name="amount" />
              </div>

              <div>
                <label>Data:</label>
                <Field name="date">
                  {({ field }) => (
                    <Datetime
                      {...field}
                      onChange={value => field.onChange(field.name)(value)}
                      value={field.value}
                    />
                  )}
                </Field>
              </div>
              <div>
                <label>Komentarz:</label>
                <Field type="text" name="comment" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Zapisz
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    modalRoot
  );
};

export default AddTransaction;
