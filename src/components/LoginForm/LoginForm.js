import css from './LoginForm.module.css';
import logo from '../../images/LoginForm/logo.svg';
import email from '../../images/LoginForm/email.svg';
import password from '../../images/LoginForm/password.svg';

export const LoginForm = () => {
  return (
    <div className={css.containerForm}>
      <form className={css.form}>
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
            placeholder="E-mail"
          />
        </label>
        <label className={css.label}>
          <img className={css.passwordIcon} alt="Password" src={password} />
          <input
            className={css.input}
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <div className={css.containerButton}>
          <button className={css.buttonLogin} type="submit">
            LOGIN
          </button>
          <button className={css.buttonReg} type="submit">
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};
