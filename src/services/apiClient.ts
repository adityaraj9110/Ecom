import axios from 'axios';

const dummyJsonClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default dummyJsonClient;
