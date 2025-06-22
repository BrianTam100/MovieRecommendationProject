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

const AllPopularMovies = () => {
    const router = useRouter();
    const pageFromQuery = parseInt(router.query.page as string) || 1;
    const [page, setPage] = useState(pageFromQuery);
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
    if (pageFromQuery !== page) {
    setPage(pageFromQuery);
    }
    const AllPopular = async () => {
      const response = await axios.get<{ results: Movie[], total_pages: number}>(
          `https://api.themoviedb.org/3/movie/popular?region=US&page=${page}`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            }
          }
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);

      };
      

    AllPopular(); 
  }, [pageFromQuery, page]);
  const getPageNumbers = () => {
    const pages = [];

    if(totalPages <= 5){
    for(let i = 1; i < totalPages; ++i){
      pages.push(i);
    }
  }else{
    pages.push(1);
    const start = Math.max(2, pageFromQuery - 1);
    const end = Math.max(2, pageFromQuery + 2);
    if(start > 2){
      pages.push("...");
    }
    if(pageFromQuery == 1){
      for (let i = start; i <= end; i++) {
      pages.push(i);
      }
    }else{
      for (let i = start; i < end && i < 500; i++) {
        pages.push(i);
        }
    }
    
    if(end < 500){
      pages.push("...");
    }
    pages.push(500);
  }
   
    return pages;
  };


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
      Popular Movies
    </h1>
      <div className=" ml-[5%] grid lg:grid-cols-5 gap-x-5 gap-y-12 mr-[5%]">
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
      <div className="flex justify-center items-center my-6 gap-4">
        <button 
          className="px-3 py-1 bg-gray-700 rounded hover:bg-blue-600 cursor-pointer"
          onClick={() => {
          const nextPage = pageFromQuery - 1;
          if (nextPage > 0) {
            router.push(`/popular/${nextPage}`);
          }
          }}>
          Previous

        </button>
      {getPageNumbers().map((page, index) => (
        typeof page === "number" ? (
        <Link key={index} href={`/popular/${page}`}>
        <button 
          className={`px-3 py-1 rounded cursor-pointer ${
          page === pageFromQuery
            ? "bg-blue-600 text-white font-bold"
            : "bg-gray-700 hover:bg-blue-600"
        }`}>
          {page}
          
        </button>
      </Link>
      ) : (
        <span
      key={index}
      className="px-3 py-1 text-gray-400 cursor-default select-none"
      >
      {page}
      </span>
        )
      ))}
      <button 
      className="px-3 py-1 bg-gray-700 rounded hover:bg-blue-600 cursor-pointer"
      onClick={() => {
      const nextPage = pageFromQuery + 1;
      if (nextPage <= 500) {
        router.push(`/popular/${nextPage}`);
      }
    }}

      >
      Next
    </button>
    </div>

    </div>
  );

}

export default AllPopularMovies;