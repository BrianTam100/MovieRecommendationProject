'use client';

import UpcomingMovies from "./UpcomingMovies";
import PopularMovies from "./PopularMovies";
import TopTelevision from "./TopTelevision"
import './globals.css';

export default function Home() {
  return (
  <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-800 via-gray-950 to-slate-800 text-white">
      <h1 className="text-4xl mb-4 text-white text-center m-16">Movie Recommendations</h1>
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