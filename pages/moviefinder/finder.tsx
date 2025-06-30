import { useEffect, useState } from "react";
import '../../components/globals.css'
import axios from 'axios';
import Image from 'next/image'
import Link from "next/link"
import Pagination from '../../components/Pagination'
type Genre = {
  name: string;
  id: string;
};

interface MediaDetails {
  title: string;
  genres: Genre[];
  runtime: number;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: number;
  backdrop_path: string;
  primary_release_date: string;
  original_language: string;
  id: string;
}

const MovieFinder = () => {
    const genreMap: { name: string; id: number }[] = [
    { name: 'Action', id: 28 },
    { name: 'Comedy', id: 35 },
    { name: 'Drama', id: 18 },
    { name: 'Fantasy', id: 14 },
    { name: 'Horror', id: 27 },
    { name: 'Science Fiction', id: 878 },
    { name: 'Romance', id: 10749 },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [movies, setMovies] = useState<MediaDetails[] | null>(null); 
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [startYear, setStartYear] = useState(2020);
    const [endYear, setEndYear] = useState(2025);

    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

    useEffect(() => {
  const findMovies = async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        with_genres: selectedGenreIds.join(','),
        sort_by: 'popularity.desc',
        'primary_release_date.gte': `${startYear}-01-01`,
        'primary_release_date.lte': `${endYear}-12-31`,
        page,
      },
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    setMovies(response.data.results.filter((m: MediaDetails) => m.original_language === 'en'));
    setTotalPages(response.data.total_pages);
  };

  if (selectedGenreIds.length > 0) {
    findMovies();
  } else {
    setMovies(null);
    setTotalPages(1);
  }
}, [selectedGenreIds, page]);


    const toggleGenre = (id: number) => {
    setSelectedGenreIds((prev) =>
        prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
    };

    return (
        <div className = "bg-blue-500 min-h-screen">
        <div className = "">

        <div className="relative w-full max-w-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-orange-500 text-black px-4 py-2 rounded-lg shadow-md m-4"
        >
          {selectedGenreIds.length > 0
            ? genreMap
                .filter((genre) => selectedGenreIds.includes(genre.id))
                .map((g) => g.name)
                .join(', ')
            : 'Choose genres'}

        </button>
        {isOpen && (
          <div className="absolute mt-2 w-full bg-slate-500 text-black border rounded-lg shadow-lg max-h-64 overflow-y-auto z-10 ml-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 ml-4">
              {genreMap.map((genre) => (
            <label key={genre.id} className="flex items-center space-x-2">
                <input
                type="checkbox"
                checked={selectedGenreIds.includes(genre.id)}
                onChange={() => toggleGenre(genre.id)}
                />
                <span>{genre.name}</span>
            </label>
            ))}

            </div>
          </div>
        )}
        </div>
        <div className="space-x-4 items-center ml-4 mt-50">
        <label>
            Start Year: 
            <input
            type="number"
            min="1900"
            max={new Date().getFullYear()}
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="ml-2 rounded px-2 py-1 text-black w-20"
            />
        </label>
        <label>
            End Year: 
            <input
            type="number"
            min={startYear}
            max={new Date().getFullYear() + 5}
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="ml-2 rounded px-2 py-1 text-black w-20"
            />
        </label>
        </div>

        <div className = "ml-20 m-10 bg-blue-500"> 
            {movies?.map((movie) => (
            <div key={movie.id} className="flex bg-white text-black p-4 rounded-lg shadow-md">
                <Link href = {`/movies/${movie.id}`}>
                <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="w-3/5 max-w-md rounded-lg object-cover"
                width={300}
                height={450}
                />
                </Link>
            </div>
            ))}
        {selectedGenreIds.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
        </div>
        </div>
        
        </div>
    )
};


export default MovieFinder;
