import styles from "../styles/Login.module.scss";

export default function LoginComponent() {
  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Login}>
        <header className={styles.HeaderEnter}>
          <h1>
            <span className={styles.Normal}>Welcome to</span> Dev<span>clone</span>
          </h1>
          <p>
            <span>DEVclone</span> is a developer community for developers
          </p>
        </header>
        <form className="Form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete="username" required />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" minLength="8" autoComplete="current-password" required />

          <input type="submit" value="Continue" className="ButtonContinue"/>
        </form>
      </div>
    </div>
  );
}
