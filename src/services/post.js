import axios from "axios";

const API_URL = `http://localhost:8080/api/`;

const getPosts = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPostByUsername = async (username) => {
  try {
    const { data } = await axios.get(`${API_URL}/posts/${username}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (token, content) => {
  try {
    const post = await axios.post(
      API_URL + "post/create",
      {
        title: content.title,
        content: content.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return post;
  } catch (error) {
    return {error};
  }
};

const deletePost = async (token, id) => {
  try {
    const deletePost = await axios.delete(
      API_URL + `post/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return deletePost;
  } catch (error) {
    return {error};
  }
}

module.exports = {
  getPosts,
  getPostByUsername,
  createPost,
  deletePost
};
