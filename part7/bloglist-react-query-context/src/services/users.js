import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/users';

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const usersService = {
  getUsers,
  getUser,
};

export default usersService;

