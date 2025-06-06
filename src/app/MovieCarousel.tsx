import { useState, useRef } from "react";
import Link from "next/link";
import Image from 'next/image'
type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

interface MovieCarouselProps {
  movies: Movie[];
  moviesPerPage: number;
  category: string
}

const MovieCarousel = ({ movies, moviesPerPage, category }: MovieCarouselProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showPrevious, setShowPrevious] = useState(false);
  const scrollRef = useRef<HTMLUListElement>(null);
  const maxPageIndex = Math.floor(movies.length / moviesPerPage);

  return (
    <div className="relative overflow-hidden">
      <ul
        className="flex transition-transform duration-800 ease-in-out gap-2 -ml-2"
        style={{
          transform: `translateX(-${pageIndex * 100}%)`,
          width: `100%`,
        }}
      >
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="w-[10%] shrink-0"
            style={{ width: 'calc((100% - 9 * 0.5rem) / 10)' }}
          >
            <Link href={`/${category}/${movie.id}`}>
              <div className = "relative w-full h-auto group">
              <Image
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                className="w-full h-auto object-cover rounded transition-transform duration-350 hover:scale-105 "
                alt={movie.title}
                width={300} 
                height={450} 
              />
              <div className = "absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-left opacity-0 translate-y-4 p-6 group-hover:opacity-100 group-hover translate-y-0 transition-all duration-300 rounded-b">
                <p className = "text-lg font-semibold">{movie.title}</p>
                <p className = "text-sm text-gray-300">{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>

              </div>
              </div>
            </Link>

          </li>
        ))}
      </ul>

      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4 bg-black/50">
        <button
          className="bg-transparent text-white p-3 text-3xl rounded-full hover:text-blue-400 transition"
          onClick={() => {
            setShowPrevious(true);
            if (pageIndex !== maxPageIndex - 1) {
              setPageIndex((prev) => Math.min(prev + 1, maxPageIndex));
            }
            if (scrollRef.current) {
              scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l7-7-7-7"
            />
          </svg>
        </button>
      </div>

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 mr-4 bg-black/50">
      {showPrevious && pageIndex > 0 && (
        <button
          className="bg-transparent text-white p-3 text-3xl rounded-full hover:text-blue-400 transition"
          onClick={() => {
            if (pageIndex >= 1) {
              setPageIndex((prev) => Math.max(prev - 1, 0));
            }
            if (scrollRef.current) {
              scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 scale-x-[-1]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l7-7-7-7"
            />
          </svg>
        </button>
      )
    }
      </div>
    </div>
  );
};

export default MovieCarousel;
