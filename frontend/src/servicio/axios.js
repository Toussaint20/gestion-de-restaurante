import axios from 'axios';

// const BASE_URL = "https://pokeapi.co/api/v2/";
const BASE_URL = "http://127.0.0.1:8000/api/";

export const get = async (url) => {
    console.log("http://127.0.0.1:8000/api/" + url)
  try {
    const response = await axios.get(BASE_URL + url);
    // const response = await axios.get("http://127.0.0.1:8000/api/mesas/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await axios.post(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const put = async (url, data) => {
  try {
    const response = await axios.put(BASE_URL + url, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const remove = async (url) => {
  try {
    const response = await axios.delete(BASE_URL + url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};