import styles from "../styles/CreateAccount.module.scss";

export default function CreateAccount() {
  return (
    <div className={styles.CreateContainer}>
      <div className={styles.Create}>
        <header className={styles.HeaderEnter}>
          <h1>
            <span className={styles.Normal}>Welcome to</span> Dev
            <span>clone</span>
          </h1>
          <p>
            <span>DEVclone</span> is a developer community for developers
          </p>
        </header>
        <form className="Form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            required
          />

          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="username"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            minLength="8"
            autoComplete="current-password"
            required
          />

          <input type="submit" value="Create account" className="ButtonContinue" />
        </form>
      </div>
    </div>
  );
}
