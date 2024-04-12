import axios from "axios";

export default axios.create({
    // Change the baseURL to /backend when using proxy and https.
    // baseURL: "/backend" ,
    baseURL: "https://localhost:8000/api",
    withCredentials: true,
});