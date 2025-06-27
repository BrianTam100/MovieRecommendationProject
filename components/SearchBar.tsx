'use client';

import { usePathname } from 'next/navigation';
import {useEffect, useState} from "react";
import axios from 'axios'
import Link from 'next/link';

type Movie = {
  id: number;
  original_title: string;
  release_date: string;
  poster_path?: string;
  original_language: string;
};



const SearchBar = () => {
    const pathname = usePathname();

    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query.trim());
    };
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  const handleSearch = async (query: string) => {
    if (!query) return;
    console.log(query)
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`, 
      },
    });
    const filteredResults = response.data.results.filter((movie: Movie) =>
      movie.original_language === "en"
    );
  setSearchResults(filteredResults);
  };
    useEffect(() => {
    console.log('Updated search results:', searchResults);
    }, [searchResults]);
    useEffect(() => {
    setQuery('');
    setSearchResults([]);
  }, [pathname]);


    
    return (
        <div className="relative w-250"> 
        <form onSubmit={handleSubmit} className = "flex gap-2">
        <div className="relative flex-grow">

        <input
            type = "text"
            value = {query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="w-full p-2 rounded border border-gray-300"
            />
        {searchResults.length > 0 && (

        <div
            className="absolute top-full left-0 w-full mt-1 bg-slate-800 border rounded shadow z-50"
            style={{ height: '1000px' }}

        >
        {searchResults.map((movie) => (
        <div key={movie.id} className="p-2 hover:bg-slate-700 cursor-pointer">
            <Link href={`/movies/${movie.id}`} className = "block">
            {movie.original_title} ({movie.release_date?.slice(0, 4) || 'N/A'})
            </Link>
            
        </div>
        ))}
        </div>
        )}
        </div>

        <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        Search
        </button>
        </form>

        </div>
    )
}

export default SearchBar;