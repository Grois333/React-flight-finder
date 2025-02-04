import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_FLIGHT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = process.env.REACT_APP_API_HOST;

export const fetchFlights = async (originSkyId, destinationSkyId, originEntityId, destinationEntityId, date) => {
  try {
    console.log(originSkyId, destinationSkyId, originEntityId, destinationEntityId, date);
    const response = await axios.get(API_URL, {
      params: { originSkyId, destinationSkyId, originEntityId, destinationEntityId, date },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching flights:", error);
    return [];
  }
};