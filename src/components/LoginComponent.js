import { useState, useContext } from "react";
import { useForm } from "react-hook-form";

import { AuthContext } from "../context/AuthContext";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../styles/Login.module.scss";

export default function LoginComponent() {
  const { user, signIn } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState({
    error: "",
  });

  const [loader, setLoader] = useState(false);

  const handleLoginUser = async (data) => {
    setError({ error: "" });
    setLoader(true);

    const response = await signIn(data);

    if (response?.error) {
      setLoader(false);
      setError({ error: response.error });
    } else {
      setLoader(false);
    }
  };

  return (
    <div className={styles.LoginContainer}>
      <div className={styles.Login}>
        <header className={styles.HeaderEnter}>
          <h1>
            <span className={styles.Normal}>Welcome to</span> Dev
            <span>clone</span>
          </h1>
          <p>
            <span>DEVclone</span> is a developer community for developers
          </p>
        </header>

        {error.error && <p className="Error">⚠️ {error.error}</p>}

        {loader && (
          <Loader
            type="ThreeDots"
            color="#48bb78"
            height={25}
            width={50}
            style={{ margin: "10px auto" }}
          />
        )}

        <form className="Form" onSubmit={handleSubmit(handleLoginUser)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email")}
            type="email"
            id="email"
            name="email"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            {...register("password")}
            type="password"
            id="password"
            name="password"
            minLength="8"
            autoComplete="current-password"
            required
          />

          <input type="submit" value="Continue" className="ButtonContinue" />
        </form>
      </div>
    </div>
  );
}
