import axios from "axios"; // Import Axios for making HTTP requests

// Define API URL and credentials from environment variables
const API_URL = process.env.REACT_APP_API_URL_FLIGHT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Fetch available flights between two airports on a given date.
 *
 * @param {string} originSkyId - The Sky ID of the departure airport.
 * @param {string} destinationSkyId - The Sky ID of the arrival airport.
 * @param {string} originEntityId - The entity ID of the departure airport.
 * @param {string} destinationEntityId - The entity ID of the arrival airport.
 * @param {string} date - The flight date in YYYY-MM-DD format.
 * @returns {Array} - An array of flight details from the API response.
 */
export const fetchFlights = async (originSkyId, destinationSkyId, originEntityId, destinationEntityId, date) => {
  try {
    // Log request parameters for debugging purposes
    console.log(originSkyId, destinationSkyId, originEntityId, destinationEntityId, date);

    // Make a GET request to the API with necessary parameters and headers
    const response = await axios.get(API_URL, {
      params: { originSkyId, destinationSkyId, originEntityId, destinationEntityId, date },
      headers: {
        "X-RapidAPI-Key": API_KEY, // API key for authentication
        "X-RapidAPI-Host": API_HOST, // API host for authentication
      },
    });

    // Return the received flight data or an empty array if no data is available
    return response.data || [];
  } catch (error) {
    // Log an error message in case of a failure
    console.error("Error fetching flights:", error);
    return []; // Return an empty array to prevent application crashes
  }
};
