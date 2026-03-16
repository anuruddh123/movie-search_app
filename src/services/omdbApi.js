import axios from "axios";

const API_KEY = "cb189ad";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query, page, type) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: page,
        type: type
      }
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movies");
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: "full"
      }
    });

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch movie details");
  }
};