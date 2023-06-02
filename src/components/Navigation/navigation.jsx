import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Media from 'react-media';
import styles from './NavigationComponent.module.css';
import excludeImage1 from './exclude1.png';
import excludeImage2 from './exclude2.png';
import excludeImage3 from './exclude3.png';
import excludeImage4 from './exclude4.png';
import excludeImage5 from './exclude5.png';
import excludeImage6 from './exclude6.png';

const Navigation = () => {
  const location = useLocation();
  return (
    <nav>
      <ul>
        <li className={styles.list}>
          <NavLink
            to="/home"
            className={`${styles.poppinsNormalBlack18px} ${
              location.pathname === '/home' ||
              location.pathname === '/wallet-team-project'
                ? styles.activeLink
                : ''
            }`}
          >
            <div
              className={` ${
                location.pathname === '/home' ||
                location.pathname === '/wallet-team-project'
                  ? `${styles.poppinsBoldBlack18px}`
                  : `${styles.poppinsNormalBlack18px}`
              }`}
            >
              <span className={styles.navTitle}>
                <img
                  className={styles.exclude}
                  src={` ${
                    location.pathname === '/home'
                      ? `${excludeImage1}`
                      : `${excludeImage2}`
                  }`}
                  alt=""
                />
                <Media
                  query="(min-width: 768px)"
                  render={() => (
                    <span className="poppins-bold-black-18px">Home</span>
                  )}
                />
              </span>
            </div>
          </NavLink>
        </li>
        <li className={styles.list}>
          <NavLink
            to="/diagram"
            className={`${styles.poppinsNormalBlack18px} ${
              location.pathname === '/diagram' ? styles.activeLink : ''
            }`}
          >
            <div
              className={` ${
                location.pathname === '/diagram'
                  ? `${styles.poppinsBoldBlack18px}`
                  : `${styles.poppinsNormalBlack18px}`
              }`}
            >
              <span className={styles.navTitle}>
                <img
                  className={styles.exclude}
                  src={` ${
                    location.pathname === '/diagram'
                      ? `${excludeImage3}`
                      : `${excludeImage4}`
                  }`}
                  alt=""
                />
                <Media
                  query="(min-width: 768px)"
                  render={() => (
                    <span className="poppins-normal-black-18px">
                      Statistics
                    </span>
                  )}
                />
              </span>
            </div>
          </NavLink>
        </li>
        <Media
          query="(max-width: 767px)"
          render={() => (
            <li className={styles.list}>
              <NavLink
                to="/currency"
                className={`${styles.poppinsNormalBlack18px} ${
                  location.pathname === '/currency' ? styles.activeLink : ''
                }`}
              >
                <div
                  className={` ${
                    location.pathname === '/currency'
                      ? `${styles.poppinsBoldBlack18px}`
                      : `${styles.poppinsNormalBlack18px}`
                  }`}
                >
                  <span>
                    <img
                      className={styles.exclude}
                      src={` ${
                        location.pathname === '/currency'
                          ? `${excludeImage5}`
                          : `${excludeImage6}`
                      }`}
                      alt=""
                    />
                  </span>
                </div>
              </NavLink>
            </li>
          )}
        />
      </ul>
    </nav>
  );
};

export default Navigation;
