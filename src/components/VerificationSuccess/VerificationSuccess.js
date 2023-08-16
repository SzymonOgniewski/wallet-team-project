import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VerificationSuccess = () => {
  const { token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState('loading');

  useEffect(() => {
    axios
      .get(`https://wallet-febk.onrender.com/api/users/verify/${token}`)
      .then(response => {
        setVerificationStatus('success');
      })
      .catch(error => {
        setVerificationStatus('error');
      });
  }, [token]);

  return (
    <div>
      {verificationStatus === 'loading' && <p>Verifying...</p>}
      {verificationStatus === 'success' && (
        <p>Verification successful! You can now log in.</p>
      )}
      {verificationStatus === 'error' && (
        <p>Verification failed. Please try again later.</p>
      )}
    </div>
  );
};

export default VerificationSuccess;
