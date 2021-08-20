import { useState } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { getUser, updateUser } from "../../services/users";
import Header from "../../components/Header";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../../styles/ProfileEditor.module.scss";

export default function EditProfile({ data, token }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleEditUser = async (body) => {
    setError("");
    setLoader(true);

    const response = await updateUser(token, data.username, body);

    if (response?.error?.response.data) {
      setLoader(false);
      setError(response?.error.response.data);
    } else {
      setLoader(false);
      router.push(`/${data.username}`);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.profileContainer}>
        {error && <p className="Error">⚠️ {error}</p>}
        {loader && (
          <Loader
            type="ThreeDots"
            color="#48bb78"
            height={25}
            width={50}
            style={{ margin: "10px auto" }}
          />
        )}
        <form className="Form" onSubmit={handleSubmit(handleEditUser)}>
          <label htmlFor="websiteUrl">Website URL</label>
          <input
            {...register("websiteUrl")}
            type="url"
            id="websiteUrl"
            name="websiteUrl"
            pattern="https://.*"
            size="30"
            defaultValue={data.websiteUrl}
            placeholder={
              data.websiteUrl ? data.websiteUrl : "https://example.com"
            }
          />

          <label htmlFor="location">Location</label>
          <input
            {...register("location")}
            type="text"
            id="location"
            name="location"
            defaultValue={data.location}
            placeholder={data.location ? data.location : "City, Country"}
          />

          <label htmlFor="bio">Bio</label>
          <textarea
            {...register("bio")}
            id="bio"
            placeholder={data.bio ? data.bio : "A short bio..."}
            defaultValue={data.bio}
          ></textarea>

          <input
            type="submit"
            value="Save profile information"
            className="ButtonContinue"
          />
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = ctx.params.profile;
  const { ["devclone.token"]: token } = parseCookies(ctx);

  const data = await getUser(user);

  return {
    props: {
      data,
      token,
    },
  };
}
