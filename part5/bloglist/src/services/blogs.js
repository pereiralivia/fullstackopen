import axios from 'axios';

const baseUrl = 'http://localhost:3001';

let token;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const login = async (userCredentials) => {
  const response = await axios.post(`${baseUrl}/api/login`, userCredentials);
  return response.data;
};

const getBlogs = async () => {
  const response = await axios.get(`${baseUrl}/api/blogs`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const createBlog = async (newBlog) => {
  const response = await axios.post(`${baseUrl}/api/blogs`, newBlog, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const updateBlog = async (blogToUpdate, id) => {
  const response = await axios.put(`${baseUrl}/api/blogs/${id}`, blogToUpdate, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/api/blogs/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default {
  setToken,
  login,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};

