import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './RegistrationForm.module.css';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
} from '@chakra-ui/react';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix';

import logo from '../../images/RegistrationPage/logo.svg';
import { register } from '../../redux/auth/AuthThunk';
import { PasswordStrength } from './PasswordStrength';

export const RegistrationForm = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter the valid email')
      .required('The email field is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
        `Invalid password`
      )
      .required('The password field is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm your password'),
    name: Yup.string()
      .min(1, 'The name must be consist of at least 1 symbol')
      .max(15, 'The name should not be more than 15 symbols')
      .required('Enter your first name'),
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async ({ name, email, password }) => {
    try {
      await dispatch(register({ name, email, password })).unwrap();
      navigate('/login');
    } catch (error) {
      setRegistrationError(true);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur
    >
      {({
        handleChange,
        handleBlur,
        touched,
        isValid,
        dirty,
        values,
        errors,
      }) => (
        <div className={styles.containerForForm}>
          <Form className={styles.form}>
            <div className={styles.logoContainer}>
              <img className={styles.logo} alt="Logo" src={logo} />
              <h1 className={styles.title}>Wallet</h1>
            </div>
            <div className={styles.inputContainer}>
              {touched.email && errors.email ? (
                <p
                  style={{
                    color: '#ff6596',
                    position: 'absolute',
                    bottom: '-30px',
                    left: '0',
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                  }}
                >
                  {errors.email}
                </p>
              ) : null}

              <EmailIcon
                className={styles.inputIcon}
                style={{ color: '#e0e0e0' }}
              />
              <input
                className={styles.input}
                type="text"
                name="email"
                id="email"
                placeholder="E-mail"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={styles.inputContainer}>
              {touched.password && errors.password ? (
                <p
                  style={{
                    color: '#ff6596',
                    position: 'absolute',
                    bottom: '-30px',
                    left: '0',
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                  }}
                >
                  {errors.password === 'Invalid password' ? (
                    <span>
                      {errors.password}
                      <button
                        type="button"
                        style={{
                          marginLeft: '10px',
                          color: 'navy',
                        }}
                        onClick={() => {
                          Notiflix.Notify.init({
                            messageMaxLength: 150,
                            position: 'center-top',
                          });
                          Notify.warning(
                            'Your password must be 8-30 characters long and must contain 1 lowercase letter, 1 uppercase letter, 1 digit and 1 special sign.'
                          );
                        }}
                      >
                        learn more
                      </button>
                    </span>
                  ) : (
                    <span>{errors.password}</span>
                  )}
                </p>
              ) : null}

              <LockIcon
                className={styles.inputIcon}
                style={{ color: '#e0e0e0' }}
              />
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                onInput={e => setPassword(e.target.value)}
              />
              <span
                onClick={handlePasswordVisibility}
                className={styles.passwordVisibilityToggle}
              >
                {showPassword ? (
                  <VisibilityOffIcon style={{ color: '#e0e0e0' }} />
                ) : (
                  <VisibilityIcon style={{ color: '#e0e0e0' }} />
                )}
              </span>
              <PasswordStrength password={password} />
            </div>
            <div className={styles.inputContainer}>
              {touched.confirmPassword && errors.confirmPassword ? (
                <p
                  style={{
                    color: '#ff6596',
                    position: 'absolute',
                    bottom: '-30px',
                    left: '0',
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                  }}
                >
                  {errors.confirmPassword}
                </p>
              ) : null}

              <LockIcon
                className={styles.inputIcon}
                style={{ color: '#e0e0e0' }}
              />
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={styles.inputContainer}>
              {touched.name && errors.name ? (
                <p
                  style={{
                    color: '#ff6596',
                    position: 'absolute',
                    bottom: '-30px',
                    left: '0',
                    fontFamily: 'Poppins',
                    fontSize: '13px',
                  }}
                >
                  {errors.name}
                </p>
              ) : null}

              <AccountBoxIcon
                className={styles.inputIcon}
                style={{ color: '#e0e0e0' }}
              />
              <input
                className={styles.input}
                type="text"
                name="name"
                id="name"
                placeholder="First name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className={styles.buttonContainer}>
                <button
                  type="submit"
                  className={styles.mainButton}
                  disabled={!isValid && !dirty}
                >
                  Register
                </button>

              <Link to="/login">
                <button type="button" className={styles.secondaryButton}>
                  Log in
                </button>
              </Link>
            </div>
            {registrationError && (
              <Alert status="error">
                <AlertIcon />
                <Box>
                  <AlertTitle>Registration Error!</AlertTitle>
                  <AlertDescription>
                    Registration failed. Please try again
                  </AlertDescription>
                </Box>
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={() => setRegistrationError(false)}
                />
              </Alert>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
};
