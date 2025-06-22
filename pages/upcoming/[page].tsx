import { useEffect, useState } from "react";
import axios from "axios";
import '../../components/globals.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from 'next/link'
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
      <div className=" ml-[5%] grid lg:grid-cols-6 gap-x-5 gap-y-12 mr-[5%]">
        {movies
        .filter((movie) => movie.poster_path) 
        .map((movie) => (
          <div key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <div className = "relative w-full h-auto group">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="w-full h-auto object-cover rounded"
                alt={movie.title}
                width={300} 
                height={450} 
              />
              <div className = "absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-left opacity-0 translate-y-4 p-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-b">
                <p className = "text-lg font-semibold">{movie.title}</p>
                <p className = "text-sm text-gray-300">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>

              </div>
              </div>
            </Link>
          </div>
        ))}

      </div>
    </div>
  );

}

export default AllUpcomingMovies;