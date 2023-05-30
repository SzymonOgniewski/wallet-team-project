import React from 'react';
import Media from 'react-media';
import frame from '../../images/RegistrationPage/frame-desktop.png';
import styles from './RegistrationPage.module.css';
import { RegistrationForm } from '../../components/RegistrationForm/RegistrationForm';

export const RegistrationPage = () => {
  return (
    <div className={styles.commonContainer}>
      <Media
        query="(min-width: 767px)"
        render={() => (
          <div className={styles.logoContainer}>
            <img className={styles.regImage} src={frame} alt="" />
            <h1 className={styles.title}>Finance App</h1>
          </div>
        )}
      />
      <div className={styles.formContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;