import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCarousel from './MovieCarousel'; 

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
        const response = await axios.get('https://api.themoviedb.org/3/trending/tv/day', {
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
      <h2 className="text-xl font-semibold text-white">Popular TV</h2>
      <MovieCarousel movies={movies} moviesPerPage={moviesPerPage} category="tv" />
    </div>
  );
};

export default PopularMovies;
