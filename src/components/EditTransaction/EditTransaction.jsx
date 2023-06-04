import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import React from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import css from './EditTransaction.module.css';
import { useCallback } from 'react';
import {
  editTransaction,
  getTransactionCategories,
} from 'redux/transactions/transactionThunk';
import { getCategories } from 'redux/transactions/transactionSelectors';
import moment from 'moment';

const modalRoot = document.querySelector('#transaction-creation-root');

const EditTransaction = ({ transaction, closeModal }) => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);

  const formik = useFormik({
    initialValues: {
      amount: transaction.amount.toString(),
      date: moment(transaction.transactionDate).toDate(),
      transactionCategory: transaction.categoryId,
      comment: transaction.comment || '',
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
      dispatch(
        editTransaction({
          id: transaction._id,
          amount: parseFloat(amount),
          transactionDate: dateFormated,
          categoryId: transactionCategory,
          comment: comment || undefined,
        })
      );
      closeModal();
    },
  });

  const handleBackdropClose = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const getCategoryColor = categoryId => {
    const category = categories.categories.find(
      category => category._id === categoryId
    );
    return category?.color || '';
  };

  return createPortal(
    <div className={css.addTransactionModal} onClick={handleBackdropClose}>
      <div className={css.addTransactionModalContent}>
        <h2
          className={css.addTransactionTitle}
          style={{
            backgroundColor: getCategoryColor(
              formik.values.transactionCategory
            ),
          }}
        >
          Edit Transaction
        </h2>
        <Formik
          initialValues={formik.initialValues}
          validationSchema={formik.validationSchema}
        >
          {({ isSubmitting }) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className={css.categoriesContainer}>
                <label htmlFor="transactionCategory">Choose category</label>
                <Field
                  as="select"
                  id="transactionCategory"
                  name="transactionCategory"
                  className={css.categoriesInput}
                  value={formik.values.transactionCategory}
                  onChange={formik.handleChange}
                >
                  <option value="">Select a category</option>
                  {categories?.categories.map(category => (
                    <option
                      key={category._id}
                      value={category._id}
                      style={{ backgroundColor: category.color }}
                    >
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
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
                          formik.setFieldValue('date', value);
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
                  SAVE
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

export default EditTransaction;
