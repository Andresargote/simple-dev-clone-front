import styles from "../styles/Header.module.scss";
import Cancel from "./Cancel";
import HamburguerMenu from "./HamburguerMenu";

//styles.nav
//styles.navMobile

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTitle}>
          <h1>
            Dev<span>clone</span>
          </h1>
        </div>

        <div className={styles.hamburguerIcon}>
          <HamburguerMenu />
        </div>

        <nav className={styles.navMobile}>
          <div className={styles.navMobileHeader}>
            <h3>DEVclone Community</h3>
            <div className={styles.cancelIcon}>
              <Cancel />
            </div>
          </div>

          <div className={styles.navMobileEnter}>
            <div>
              <p>A place where developers can share their knowledge</p>
              <div className={styles.navMobileEnterButtons}>
                <button className={styles.navMobileEnterCreate}>
                  Create account
                </button>
                <button>Log in</button>
              </div>
            </div>
          </div>

          <div className={styles.navMobileNav}>
            <ul>
              <li>
                <a href="#"><span>🏠</span>Home</a>
              </li>
            </ul>
          </div>

          {/* <ul>
            <li>
              <a href="#">Log in</a>
            </li>
            <li className={styles.navButton}>
              <a href="#">Create account</a>
            </li>
          </ul> */}
        </nav>
        <div className={styles.navMobileTouch} />
      </div>
    </header>
  );
}
