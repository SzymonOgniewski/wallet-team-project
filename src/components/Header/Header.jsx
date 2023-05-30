import React from "react";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";

import css from "./Header.module.css";

import ModalLogout from "./ModalLogout/ModalLogout";

import {getIsModalLogoutOpen} from "../../redux/Selectors";
import { selectUserName } from "../../redux/auth/AuthSelectors";
import {toggleModal} from "../../redux/data/globalSlice";

import Logo from "../Logo/Logo";
import LogoutSvg from "./LogoutSvg";

const Header = () => {
    const dispatch = useDispatch();
    const isModalLogoutOpen = useSelector(getIsModalLogoutOpen);
    const userName = useSelector(selectUserName);

    return (
        <header className={css.Header}>
            <div className={css.Container}>
                <nav className={css.Nav}>
                    <Logo path="/home" />
                    <div className={css.UserNav}>
                        <p className={css.UserNavItem}>{userName}</p>
                        <button
                          type="button"
                          className={css.ButtonExit}
                          onClick={() => {dispatch(toggleModal());}}
                        >
                            <LogoutSvg />
                            <Media
                              query="(min-width: 768px)"
                              render={() => <p className={`${css.ExitNavItem}`}>Exit</p>}
                            />
                        </button>
                    </div>
                </nav>
            </div>

            {isModalLogoutOpen && (
              <ModalLogout
                closeModal={() => {
                  dispatch(toggleModal());
                }}
              />
            )}

        </header>
    );
};

export default Header;