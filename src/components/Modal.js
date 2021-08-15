import { useState } from "react";
import { deletePost } from "../services/post";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "../styles/Modal.module.scss";

export default function Modal({ token, user, post, setPost, setModal }) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const handleDeletePost = async () => {
    setLoader(true);

    const response = await deletePost(token, post.id);

    if (response?.error?.response.status === 401) {
      setLoader(false);
      setError("Unauthorized");
    }

    if (response.error?.response.data.error) {
      setLoader(false);
      setError(response.error.response.data.error);
    }

    setLoader(false);
    setModal(false);
  };

  return (
    <div className={styles.modal}>
      <h4>Are you sure you want to delete this article?</h4>
      {loader && (
        <Loader
          type="ThreeDots"
          height={25}
          color="#d2d6db"
          width={50}
          style={{ margin: "10px auto" }}
        />
      )}
      {error !== "" && <p className="Error">⚠️ {error}</p>}
      <p>Article: {post.title}</p>
      <div>
        <button className={styles.red} onClick={handleDeletePost}>
          Delete
        </button>
        <button
          onClick={() => {
            setModal(false);
            setPost({});
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
