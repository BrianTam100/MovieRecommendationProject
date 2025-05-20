import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCarousel from './MovieCarousel'; // Import the reusable carousel component

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const moviesPerPage = 10;     
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`, 
          },
        });

        setMovies(response.data.results);  
        console.log('Fetched upcoming movies:', response.data); 
      } catch (error) {
        console.error('Error fetching upcoming movie details:', error);
      }
    };

    fetchUpcomingMovies();  
  }, []); 

  return (
    <div>
     <div className="flex items-center gap-4">
      <h2 className="text-xl font-semibold text-white">
        Popular Movies
      </h2>
      <button
        className="m-1 ml-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
      >
        View all
      </button>
      </div>
      <MovieCarousel movies={movies} moviesPerPage={moviesPerPage} category="movies" />
    </div>
  );
};

export default PopularMovies;
