import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Switch from 'react-switch';
import css from './AddTransaction.module.css';
import { useCallback } from 'react';
import {
  addNewTransaction,
  getTransactionCategories,
} from 'redux/transactions/transactionThunk';
import { getCategories } from 'redux/transactions/transactionSelectors';
import moment from 'moment';

const modalRoot = document.querySelector('#transaction-creation-root');

const AddTransaction = ({ closeModal }) => {
  const [checked, setChecked] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: '',
      date: new Date(),
      transactionCategory: '6471096a9af3d469961187f0',
      comment: '',
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('Amount is required'),
      date: Yup.date(),
      transactionCategory: Yup.string(),
    }),
    onSubmit: ({ amount, date, transactionCategory, comment }) => {
      const dateFormated = moment(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      console.log({
        amount: amount,
        transactionDate: dateFormated,
        categoryId: transactionCategory,
        comment: comment,
      });
      comment === ''
        ? dispatch(
            addNewTransaction({
              amount: amount,
              transactionDate: dateFormated,
              categoryId: transactionCategory,
            })
          )
        : dispatch(
            addNewTransaction({
              amount: amount,
              transactionDate: dateFormated,
              categoryId: transactionCategory,
              comment: comment,
            })
          );
    },
  });
  const handleChange = useCallback(
    checked => {
      setChecked(checked);
      if (checked === true) {
        formik.values.transactionCategory = '6473544cf09b05df28a84d32';
      }
      if (checked === false) {
        formik.values.transactionCategory = '6471096a9af3d469961187f0';
      }
    },
    [formik.values]
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionCategories());
  }, [dispatch]);
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
  const handleChangeCategory = e => {
    console.log(e.target.value);
    if (e.target.value === '6471096a9af3d469961187f0') setChecked(false);
    formik.values.transactionCategory = e.target.value;
  };

  return createPortal(
    <div className={css.addTransactionModal} onClick={handleBackdropClose}>
      <div className={css.addTransactionModalContent}>
        <h2 className={css.addTransactionTitle}>Add Transaction</h2>
        <div className={css.switchContainer}>
          {checked === true ? (
            <>
              <span className={css.switchText}>Income</span>
              <Switch
                checked={checked}
                onChange={handleChange}
                offColor="#24CCA7"
                onColor="#FF6596"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span className={css.switchExpenseActive}>Expense</span>
            </>
          ) : (
            <>
              <span className={css.switchIncomeActive}>Income</span>
              <Switch
                checked={checked}
                onChange={handleChange}
                offColor="#24CCA7"
                onColor="#FF6596"
                uncheckedIcon={false}
                checkedIcon={false}
              />
              <span className={css.switchText}>Expense</span>
            </>
          )}
        </div>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
        >
          {({ isSubmitting }) => (
            <Form onSubmit={formik.handleSubmit}>
              {checked && (
                <div className={css.categoriesContainer}>
                  <label htmlFor="transactionCategory">Choose category</label>
                  <Field
                    as="select"
                    id="transactionCategory"
                    name="transactionCategory"
                    onChange={handleChangeCategory}
                    className={css.categoriesInput}
                    value={formik.values.transactionCategory}
                  >
                    {categories?.categories.map(category => {
                      if (category.name === 'default transaction') {
                        return (
                          <option
                            className={css.selectOption}
                            key={category._id}
                            value={category._id}
                          >
                            Other expenses
                          </option>
                        );
                      } else {
                        return (
                          <option
                            className={css.selectOption}
                            key={category._id}
                            value={category._id}
                          >
                            {category.name}
                          </option>
                        );
                      }
                    })}
                  </Field>
                </div>
              )}
              <div className={css.amountDateFlex}>
                <div>
                  <Field
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    className={css.amountInput}
                    {...formik.getFieldProps('amount')}
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <div>{formik.errors.amount}</div>
                  ) : null}
                </div>
                <div>
                  <Field name="date" {...formik.getFieldProps('date')}>
                    {({ field }) => (
                      <Datetime
                        className={css.dateInput}
                        {...field}
                        onChange={value => {
                          formik.values.date = value;
                          field.onChange({
                            target: { name: field.name, value },
                          });
                        }}
                        value={field.value}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div>
                <Field
                  className={css.commentInput}
                  type="text"
                  name="comment"
                  placeholder="Comment"
                  {...formik.getFieldProps('comment')}
                />
              </div>
              <div className={css.btnsContainer}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={css.submitBtn}
                >
                  ADD
                </button>
                <button
                  className={css.cancelBtn}
                  onClick={closeModal}
                  disabled={isSubmitting}
                >
                  CANCEL
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    modalRoot
  );
};

export default AddTransaction;
