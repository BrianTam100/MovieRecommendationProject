import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCarousel from './MovieCarousel';
import { getReleaseInfo } from "../../components/releaseDate";
import Link from 'next/link';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  primary_release_date: string;
  vote_average: number;
  vote_count: number;
};

type ReleaseDate = {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    note: string;
    release_date: string;
  }[];
};

const UpcomingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const moviesPerPage = 10;
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  useEffect(() => {
  const fetchUpcomingMovies = async () => {
    const filteredMovies: Movie[] = [];
    let count = 1;

    while (filteredMovies.length < 20) {
      try {
        const movieRes = await axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/movie/upcoming?page=${count}&region=US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);


        for (const movie of movieRes.data.results) {
        if(movie.release_date.slice(0, 4) > "2024"){
        try {
          if (movie.release_date) {
          const releaseDate = new Date(movie.release_date);
          releaseDate.setHours(0, 0, 0, 0);

          if (releaseDate >= todayMidnight) {
            filteredMovies.push(movie);
          }
        }
            } catch (error) {
              console.error(`Failed to fetch release dates for movie ${movie.id}:`, error);
            }
        }
        
    }


        ++count;

      } catch (error) {
        console.error("Error fetching upcoming movies or release dates:", error);
        break; 
      }
    }

    setMovies(filteredMovies.slice(0, 20)); 
  };

  fetchUpcomingMovies();
}, []);


  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Upcoming Movies</h2>
        <div className = "m-1 ml-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
        <Link href = "/upcoming/1">
        <button >
          View all
        </button>
        </Link>

        </div>
      </div>
      <MovieCarousel movies={movies} moviesPerPage={moviesPerPage} category="movies" />
    </div>
  );
};

export default UpcomingMovies;
