import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

export const fetchNowPlayingMovies = async (url) => {
  console.log("Sending request to TMDB API...");
  const options = {
    method: 'GET',
    url: url,
    params: { language: 'en-US', page: '1' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    console.log("Sending request to TMDB API...");
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};
