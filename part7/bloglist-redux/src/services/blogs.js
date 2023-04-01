import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/blogs';

let token;

const setToken = (newToken) => (token = newToken);

const getBlogs = async () => {
  const response = await axios.get(baseUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateBlog = async (updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const blogsService = {
  setToken,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
};

export default blogsService;

