import axios from "axios";
const baseApiUrl = process.env.REACT_APP_API_BASE_URL;

class Api {
  async get(url: string) {
    try {
      const res = await axios.get(`${baseApiUrl}/${url}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async post(url: string, body: any) {
    try {
      const res = await axios.post(`${baseApiUrl}/${url}`, body);
      return res;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default new Api();
