import axios from "axios";

const API_URL = `http://localhost:8080/api/`;

const getPosts = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    return error;
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

const getPostBySlug = async (slug) => {
  try {
    const { data } = await axios.get(`${API_URL}/post/${slug}`);
    return data;
  } catch (error) {
    console.log(error);
    return {error};
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
    return { error };
  }
};

const updatePost = async (token, slug, content) => {
  try {
    const post = await axios.put(
      API_URL + `post/update/${slug}`,
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
    return { error };
  }
};

const deletePost = async (token, slug) => {
  try {
    const deletePost = await axios.delete(API_URL + `post/delete/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return deletePost;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  getPosts,
  getPostByUsername,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
