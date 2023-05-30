import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import css from './LoginForm.module.css';
import logo from '../../images/LoginForm/logo.svg';
import email from '../../images/LoginForm/email.svg';
import password from '../../images/LoginForm/password.svg';

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(12, 'Password must be at most 12 characters')
        .required('Password is required'),
    }),
    onSubmit: values => {
      console.log('Form submitted:', values);
    },
  });

  return (
    <div className={css.containerForm}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.logoContainer}>
          <img className={css.logo} alt="Logo" src={logo} />
          <h1 className={css.title}>Wallet</h1>
        </div>
        <label className={css.label}>
          <img className={css.emailIcon} alt="Email" src={email} />
          <input
            className={css.input}
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
        </label>
        {formik.touched.email && formik.errors.email ? (
          <div className={css.error}>{formik.errors.email}</div>
        ) : null}

        <label className={css.label}>
          <img className={css.passwordIcon} alt="Password" src={password} />
          <input
            className={css.input}
            type="password"
            name="password"
            placeholder="Password"
            {...formik.getFieldProps('password')}
          />
        </label>
        {formik.touched.password && formik.errors.password ? (
          <div className={css.error}>{formik.errors.password}</div>
        ) : null}

        <div className={css.containerButton}>
          <button className={css.buttonLogin} type="submit">
            LOGIN
          </button>
          <Link to="/registration" className={css.buttonReg}>
            REGISTER
          </Link>
        </div>
      </form>
    </div>
  );
};
