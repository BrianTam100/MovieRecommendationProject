'use client';

import SearchBar from "./SearchBar";
import React, { useState } from "react";
import UpcomingMovies from "./UpcomingMovies";
import PopularMovies from "./PopularMovies";
import TopTelevision from "./TopTelevision"
import './globals.css';
type Movie = {
  id: number;
  title: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [showMovies, setShowMovies] = useState(true); 


  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex items-center bg-black flex-col py-12">
        <h1 className="text-4xl mb-4 text-white">Movie Recommendations</h1>
      </div>
      <div className="flex bg-grey-800 mb-8">
      <UpcomingMovies />
      </div>
      <div className= "mb-8">
        <PopularMovies />
      </div>
      <div className = "mb-100">
        <TopTelevision />
      </div>
    </div>
  );
}