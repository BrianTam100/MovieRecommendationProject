import { useEffect, useState } from "react";
import axios from "axios";
import '../../components/globals.css'
import Image from 'next/image'
import { useRouter } from 'next/router';

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
    const router = useRouter();
    const [movies, setMovies] = useState<Movie[]>([]);
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';
      useEffect(() => {
        const AllUpcoming = async () => {
            let allMovies: Movie[] = [];
            const maxResponse = 10;

            for(let page = 1; page < maxResponse; ++page){
              const response = await axios.get<{ results: Movie[]}>(`https://api.themoviedb.org/3/movie/upcoming?region=US&page=${page}`,{
              headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
              },

            }
            );
            const filtered = response.data.results.filter(movie => {
            return new Date(movie.release_date) > new Date('2024-12-31');
            });

            allMovies = allMovies.concat(filtered);
            }
            setMovies(allMovies);


        }
    AllUpcoming();
    }, []);

    return (
    <div className="min-h-screen flex flex-col bg-slate-800 text-white">
      <div>
      <button
        className="bg-white hover:bg-orange-700 text-gray-700 font-bold py-2 px-4 rounded m-6"
        onClick={() => router.push('/')}
      >
        Home
      </button>
    </div>
    <h1 className = "ml-[5%] m-5">
      Upcoming Movies
    </h1>
      <div className=" ml-[5%] grid lg:grid-cols-6 gap-x-5 gap-y-12">
        {movies
        .filter((movie) => movie.poster_path) 
        .map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded"
            />
          </div>
        ))}

      </div>
    </div>
  );

}

export default AllUpcomingMovies;