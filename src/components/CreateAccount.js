import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createUser } from "../services/users";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import styles from "../styles/CreateAccount.module.scss";

export default function CreateAccount() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const [error, setError] = useState({
    error: "",
  });
  const [loader, setLoader] = useState(false);

  const handleCreateUser = async (data) => {
    setError({ error: "" });
    setLoader(true);

    const response = await createUser(data);

    if (response?.error) {
      setLoader(false);
      setError({ error: response.error });
    } else {
      setLoader(false);
      router.push("/login");
    }
  };

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

        <form className="Form" onSubmit={handleSubmit(handleCreateUser)}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            required
          />

          <label htmlFor="name">Name</label>
          <input
            {...register("name")}
            type="text"
            id="name"
            name="name"
            autoComplete="username"
            required
          />

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

          <input
            type="submit"
            value="Create account"
            className="ButtonContinue"
          />
        </form>
      </div>
    </div>
  );
}
