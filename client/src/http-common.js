import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000/exercises",
    headers: {
      "Content-type": "application/json"
    }
});