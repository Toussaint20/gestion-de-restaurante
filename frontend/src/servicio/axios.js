// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
});

// You can add common headers or auth tokens here
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const fetchData = async () => {
  try {
    const response = await instance.get('mesas');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
};

export const fetchAxios = async (url) => {
    try {
        const response = await axios.get(API_BASE_URL+url)
        return response
    } catch (error) {
        console.log("ERR ", error);
        throw error;
    }
}