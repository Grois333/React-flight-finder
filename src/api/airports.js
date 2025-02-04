import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_AIRPORT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = process.env.REACT_APP_API_HOST;

export const fetchAirport = async (query = 'new', locale = 'he-IL') => {
  try {
    const response = await axios.get(API_URL, {
      params: { query, locale },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });

    if (response.data) {
      console.log("Data received:", response.data);
    }
    return response.data || {};
  } catch (error) {
    console.error("Error fetching airport search:", error.response ? error.response.data : error.message);
    return {};
  }
};