import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './VerificationSuccess.module.css';

const VerificationSuccess = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('loading');
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://wallet-febk.onrender.com/api/users/verify/${token}`)
      .then(response => {
        setVerificationStatus('success');
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      })

      .catch(error => {
        setVerificationStatus('error');
      });
  }, [token, navigate]);

  return (
    <div className={styles.commonContainer}>
      {verificationStatus === 'loading' && (
        <p className={styles.title}>Verifying...</p>
      )}
      {verificationStatus === 'success' && (
        <p className={styles.title}>
          Verification successful! You can now log in.
        </p>
      )}
      {verificationStatus === 'error' && (
        <p className={styles.title}>
          Verification failed. Please try again later.
        </p>
      )}
    </div>
  );
};

export default VerificationSuccess;
