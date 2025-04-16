import axios from "axios";

const BASE_URL = "http://localhost:8080/api/data";

export default {
  getAll: async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  },
  getAllByType: async (type: string) => {
    const res = await axios.get(`${BASE_URL}?type=${type}`);
    return res.data;
  },
  getAllTopics: async () => {
    const res = await axios.get(`${BASE_URL}/topics`);
    return res.data;
  },
};
