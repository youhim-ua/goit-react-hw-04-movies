import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

class Navigation extends Component {
  render() {
    return (
      <header className={styles.header}>
        <nav>
          <ul className={styles.navigationList}>
            <li className={styles.navigationListItem}>
              <NavLink
                to="/"
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
              >
                Home
              </NavLink>
            </li>
            <li className={styles.navigationListItem}>
              <NavLink
                to="/movies"
                className={styles.navLink}
                activeClassName={styles.navLinkActive}
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Navigation;
