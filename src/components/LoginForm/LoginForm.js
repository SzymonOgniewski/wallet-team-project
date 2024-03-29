import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from '@chakra-ui/react';
import { logIn } from '../../redux/auth/AuthThunk';
import { selectIsLoggedIn } from '../../redux/auth/AuthSelectors';
import css from './LoginForm.module.css';
import logo from '../../images/LoginForm/logo.svg';
import email from '../../images/LoginForm/email.svg';
import password from '../../images/LoginForm/password.svg';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [loginError, setLoginError] = useState(false);
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
        .min(6, 'Password must be at least 8 characters')
        .max(12, 'Password must be at most 30 characters')
        .required('Password is required'),
    }),
    onSubmit: ({ email, password }) => {
      dispatch(logIn({ email, password }))
        .unwrap()
        .then(() => {
          navigate('/home');
        })
        .catch(() => {
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 5000);
        });
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
        <div className={css.containerButton}>
          {formik.touched.password && formik.errors.password ? (
            <div className={css.error1}>{formik.errors.password}</div>
          ) : null}

          {isLoggedIn ? (
            <button className={css.buttonLogin} type="button" disabled>
              Logging in...
            </button>
          ) : (
            <button className={css.buttonLogin} type="submit">
              LOGIN
            </button>
          )}

          <Link to="/registration" className={css.buttonReg}>
            REGISTER
          </Link>
        </div>
        {loginError && (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Login Error!</AlertTitle>
              <AlertDescription>
                login failed. Use different password or login.
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setLoginError(false)}
            />
          </Alert>
        )}
      </form>
    </div>
  );
};
