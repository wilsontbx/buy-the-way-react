import axios from "axios";
import qs from "qs";

const baseUrl = "http://localhost:5000/api/v1";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

const backendAPI = {
  login: (email, password) => {
    return axiosInstance.post(
      "/users/login",
      qs.stringify({
        email: email,
        password: password,
      })
    );
  },
  register: (firstname, lastname, username, email, password) => {
    return axiosInstance.post(
      "/users/register",
      qs.stringify({
        first_name: firstname,
        last_name: lastname,
        username: username,
        email: email,
        password: password,
      })
    );
  },
  getUserInfo: (token) => {
    return axiosInstance.post(
      "/users/getuserinfo",
      qs.stringify({
        token: token,
      })
    );
  },
  create: (
    productname,
    imageUrl,
    country,
    category,
    foodexpiry,
    foodchilled,
    foodspecial,
    collectspecial,
    url,
    qty,
    price,
    message,
    receipt,
    email
  ) => {
    return axiosInstance.post(
      "/products/create",
      qs.stringify({
        productname: productname,
        imageUrl: imageUrl,
        country: country,
        category: category,
        foodexpiry: foodexpiry,
        foodchilled: foodchilled,
        foodspecial: foodspecial,
        collectspecial: collectspecial,
        url: url,
        qty: qty,
        price: price,
        message: message,
        receipt: receipt,
        email: email,
      })
    );
  },
};

export default backendAPI;
