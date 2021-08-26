import { useState } from "react";
import router from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { getUser, updateUser, updateUserImage } from "../../services/users";
import Header from "../../components/Header";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../../styles/ProfileEditor.module.scss";
import Head from "next/head";
import Error from "../../components/Error";

export default function EditProfile({ errorCode, data, token }) {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [file, setFile] = useState(null);
  const [imgError, setImgError] = useState("");
  const [imgLoader, setImgLoader] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const fileSelectHandler = (event) => {
    setFile(event.target.files[0])
  }

  const fileUploadHandler = async (event) => {
    event.preventDefault();
    setImgError("");
    setImgLoader(true);
    setSuccess(false);

    const res = await updateUserImage(token, data.username, file, file.type);

    if (res?.error?.response.data.error) {
      setImgLoader(false);
      setImgError(res?.error.response.data.error);
    }

    setImgLoader(false);
    setSuccess(true);

  }

  return (
    <>
      <Head>
        <title>{data?.username ? `Edit - ${data.username}` : "Error"}</title>
      </Head>
      {errorCode ? (
        <Error error={errorCode} />
      ) : (
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
              <label htmlFor="profileImg">Profile image</label>
              {imgLoader && (
                <Loader
                  type="ThreeDots"
                  color="#48bb78"
                  height={25}
                  width={50}
                  style={{ margin: "10px auto" }}
                />
              )}
              {success && <p style={{fontSize: "14px", marginBottom: "10px"}}>✅ Image uploaded successfully</p>}
              {imgError && <p className="Error">⚠️ {imgError}</p>}
              <input
                type="file"
                id="profileImg"
                name="profileImg"
                accept="image/png, image/jpeg, image/jpg"
                multiple={false}
                onChange={fileSelectHandler}
              />
              <button onClick={fileUploadHandler} className={styles.uploadButton}>Upload</button>

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
      )}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = ctx.params.profile;
  const data = await getUser(user);
  const { res } = ctx;

  const errorCode = data.ok ? false : data.error?.response.status;

  if (errorCode) {
    res.statusCode = errorCode;
    return {
      props: {
        errorCode,
      },
    };
  } else {
    const { ["devclone.token"]: token } = parseCookies(ctx);

    return {
      props: {
        data,
        token,
      },
    };
  }
}
