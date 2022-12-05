import axios from "axios";

export const exercisesAPI = (url = "http://localhost:5000/exercises") => {
  return axios.create({
    baseURL: url,
  })
};

export const usersAPI = (url = "http://localhost:5000/users") => {
  return axios.create({
    baseURL: url,
  })
};