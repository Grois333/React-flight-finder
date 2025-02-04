import axios from "axios"; // Import Axios for making HTTP requests

// Define API URL and credentials from environment variables
const API_URL = process.env.REACT_APP_API_URL_AIRPORT;
const API_KEY = process.env.REACT_APP_API_KEY;
const API_HOST = process.env.REACT_APP_API_HOST;

/**
 * Fetch airport data based on a search query.
 * 
 * @param {string} query - The airport search query (default: 'new').
 * @param {string} locale - The locale for the search results (default: 'he-IL').
 * @returns {Object} - The airport data from the API response.
 */
export const fetchAirport = async (query = 'new', locale = 'he-IL') => {
  try {
    // Make a GET request to the API with query parameters and headers
    const response = await axios.get(API_URL, {
      params: { query, locale },
      headers: {
        "X-RapidAPI-Key": API_KEY, // API key for authentication
        "X-RapidAPI-Host": API_HOST, // API host for authentication
      },
    });

    // Log data received from the API for debugging purposes
    if (response.data) {
      console.log("Data received:", response.data);
    }

    // Return the received data or an empty object if no data is available
    return response.data || {};
  } catch (error) {
    // Log an error message with detailed response data if available
    console.error("Error fetching airport search:", error.response ? error.response.data : error.message);
    return {}; // Return an empty object in case of an error
  }
};
