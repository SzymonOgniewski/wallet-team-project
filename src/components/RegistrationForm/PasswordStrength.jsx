import React from 'react';
import styles from './PasswordStrength.module.css';
import zxcvbn from 'zxcvbn';

export const PasswordStrength = ({ password }) => {
  const testResult = zxcvbn(password);
  const num = (testResult.score * 100) / 4;

  const funcProgressColor = () => {
    switch (testResult.score) {
      case 0:
        return '#828282';
      case 1:
        return '#EA1111';
      case 2:
        return '#FFAD00';
      case 3:
        return '#9bc158';
      case 4:
        return '#00b500';
      default:
        return 'none';
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    background: funcProgressColor(),
    height: '7px',
  });

  return (
    <>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={changePasswordColor()}></div>
      </div>
    </>
  );
};
