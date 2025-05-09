'use client';

import React, { useState, useEffect } from 'react';
import { fetchNowPlayingMovies } from './tmdb.js'; 
import Link from "next/link"
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};


export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [isVisible, setIsVisible] = useState(true);

  const handleFetch = async () => {
    const results = await fetchNowPlayingMovies('https://api.themoviedb.org/3/movie/now_playing&append_to_reponse=credits');
    console.log(results);
    setMovies(results); 
  };

   useEffect(() => {
    handleFetch(); 
  }, []); 
  return (
    <div>
      <ul className="flex overflow-x-auto p-4 flex-row gap-4">
        {movies.slice(0, 10).map((movie) => (
          <li key={movie.id} className="mb-4">
            <Link href={`/movies/${movie.id}`}>
            <img 
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
              className="w-[80vw] sm:w-[300px] h-auto object-cover rounded"
              alt={movie.title} 
            />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
