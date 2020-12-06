import axios from "axios";
import qs from "qs";

//const baseUrl = "https://buy-the-way-app.herokuapp.com/api/v1";
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
      {},
      {
        headers: {
          auth_token: token,
        },
      }
    );
  },
  createRequest: (
    productname,
    imageUrl,
    imageAlt,
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
    existingProduct,
    email
  ) => {
    return axiosInstance.post(
      "/products/request/create",
      qs.stringify({
        productname: productname,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
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
        existingProduct: existingProduct,
        email: email,
      })
    );
  },
  search: (keyword) => {
    return axiosInstance.post(
      "/products/search",
      qs.stringify({
        keyword: keyword,
      })
    );
  },

  preorderCreate: (productname, imgURL, country, category, foodexpiry, foodchilled, foodspecial, collectspecial, returndate) => {

    return axiosInstance.post("products/preorder/create", qs.stringify({
      productname: productname,
      imgURL: imgURL,
      country: country,
      category: category,
      foodexpiry: foodexpiry,
      foodchilled: foodchilled,
      foodspecial: foodspecial,
      collectspecial: collectspecial,
      returndate: returndate
    }))


  }
};

export default backendAPI;
