import axios from "axios";

export default (url = "http://localhost:5000/exercises") => {
  return axios.create({
    baseURL: url,
  })
};