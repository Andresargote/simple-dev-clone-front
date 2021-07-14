import { useState } from "react";
import Link from "next/link";
import useMediaQuery from "../hooks/useMediaQueries";

import styles from "../styles/Header.module.scss";
import Cancel from "./Cancel";
import HamburguerMenu from "./HamburguerMenu";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const isBreakpoint = useMediaQuery(425);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          <h1>
            Dev<span>clone</span>
          </h1>
        </div>

        <div className={styles.hamburguerIcon}>
          <HamburguerMenu onClick={() => setMenu(true)} />
        </div>

        <nav className={!menu || !isBreakpoint ? styles.nav : styles.navMobile}>
          <div className={styles.navMobileHeader}>
            <h3>DEVclone Community</h3>

            <div className={styles.cancelIcon}>
              <Cancel onClick={() => setMenu(false)} />
            </div>
          </div>

          <div className={styles.navMobileEnter}>
            <div>
              <p>A place where developers can share their knowledge</p>
              <div className={styles.navMobileEnterButtons}>
                <button className={styles.navMobileEnterCreate}>
                  <Link href="/register">
                    <a>
                      Create account
                    </a>
                  </Link>
                </button>
                <button>
                  <Link href="/login">
                    <a>
                      Log in
                    </a>
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.navMobileNav}>
            <ul>
              <li>
                <Link href="/">
                  <a>
                    <span>🏠</span>Home
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <ul>
            <li>
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </li>
            <li className={styles.navButton}>
              <Link href="/register">
                <a>Create account</a>
              </Link>
            </li>
          </ul>
        </nav>

        <div
          className={!menu ? styles.displayNone : styles.navMobileTouch}
          onClick={() => setMenu(false)}
        />
      </div>
    </header>
  );
}
