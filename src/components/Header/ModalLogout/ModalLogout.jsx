import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { logOut } from 'redux/auth/AuthThunk';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import css from './ModalLogout.module.css';

const modalRoot = document.querySelector('#modal-logout-root');

const ModalLogout = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogoutClick = () => {
    dispatch(logOut());
    navigate('/login');
    closeModal();
  };

  return createPortal(
    <div className={css.ExitModal} onClick={handleBackdropClose}>
      <div className={css.ExitModalContent}>
        <h1 className={css.ExitTitle}>
          Unsaved changes will be lost.
          <br />
          Are you sure you want to sign out?
        </h1>
        <button
          type="button"
          className={css.BtnYes}
          onClick={() => {
            handleLogoutClick();
          }}
        >
          Yes
        </button>
        <button type="button" className={css.BtnNo} onClick={closeModal}>
          {' '}
          No
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default ModalLogout;