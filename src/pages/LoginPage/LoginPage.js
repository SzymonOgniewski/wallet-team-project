import React from 'react';
import Media from 'react-media';
import { LoginForm } from 'components/LoginForm/LoginForm';
import frame from '../../images/LoginPage/login-frame.png';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Media
          query="(min-width: 767px)"
          render={() => (
            <div className={styles.containerLogo}>
              <img className={styles.image} src={frame} alt="" />
              <h1 className={styles.title}>Finance App</h1>
            </div>
          )}
        />
        <div className={styles.form}>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
