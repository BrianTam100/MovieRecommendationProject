import { useEffect, useState } from "react";
import axios from "axios";
import '../../components/globals.css'

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  primary_release_date: string;
  vote_average: number;
  vote_count: number;
  total_pages: number;
};



const AllUpcomingMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';
      useEffect(() => {
        const AllUpcoming = async () => {

            const response = await axios.get<{ results: Movie[] }>('https://api.themoviedb.org/3/movie/upcoming?region=US&page=1',{
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
            }
            );
            setMovies([response.data.results[0]])
        
        }
    AllUpcoming();
    }, []);

    return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-800 via-gray-950 to-slate-800 text-white">
    
    <div className="mt-8 ml-[20%]">
      {movies.map((movie) => (
        <div key={movie.id} className="mb-4 text-xl">
          {movie.title}
        </div>
      ))}
    </div>
  </div>
);
}

export default AllUpcomingMovies;