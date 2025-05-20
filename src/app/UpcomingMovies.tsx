import { useEffect, useState } from "react";
import axios from 'axios';
import MovieCarousel from './MovieCarousel';
import { getReleaseInfo } from "../../components/releaseDate";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
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
      try {
        const movieRes = await axios.get<{ results: Movie[] }>(
          'https://api.themoviedb.org/3/movie/upcoming?page=1',
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);

        const filteredMovies: Movie[] = [];

        for (const movie of movieRes.data.results) {
          const releaseDateRes = await axios.get<{ results: ReleaseDate[] }>(`https://api.themoviedb.org/3/movie/${movie.id}/release_dates`,
            {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );

          const { usReleaseDate } = getReleaseInfo(releaseDateRes.data.results) || {};

          if (usReleaseDate) {
            const releaseDate = new Date(usReleaseDate);
            releaseDate.setHours(0, 0, 0, 0);

            if (releaseDate >= todayMidnight) {
              filteredMovies.push(movie);
            }
          }
        }

        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching upcoming movies or release dates:", error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-white">Upcoming Movies</h2>
        <button className="m-1 ml-auto px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white">
          View all
        </button>
      </div>
      <MovieCarousel movies={movies} moviesPerPage={moviesPerPage} category="movies" />
    </div>
  );
};

export default UpcomingMovies;
