import axios from "axios";

const BASE_URL = "http://localhost:8080/api/data";

export default {
  getAll: async () => {
    const res = await axios.get(BASE_URL);
    return res.data;
  },
};
