'use client';
import UpcomingMovies from "./UpcomingMovies";
import PopularMovies from "./PopularMovies";
import TopTelevision from "./TopTelevision"
import SearchBar from '../../components/SearchBar';
import MovieFinder from '../../components/MovieFinder';
import './globals.css';



export default function Home() {
  return (
  <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <h1 className="text-4xl mb-4 text-white text-center m-16">Movie Recommendations</h1>
       <div className="flex mb-8 px-4">
        <SearchBar/>
        <MovieFinder/>
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