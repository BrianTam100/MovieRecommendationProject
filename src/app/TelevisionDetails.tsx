import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from 'axios';
import './globals.css';
type Actors = {
    name: string;
    character: string;
    id: number;
    profile_path: string
  };

type Genre = {
name: string;
};


type Details = {
  name: string
  number_of_seasons: number
  first_air_date: string
  in_production: boolean
  last_air_date: string
  title: string
  poster_path: string
  overview: string
  genres: Genre[]
  number_of_episodes: number
  air_date: number
  still_path: string
}

const TelevisionDetails = () => {
  const router = useRouter();
  const [details, setDetails] = useState<Details>(); 
  const [cast, setCast] = useState<Actors[]>([]); 
  const { id } = router.query;
  
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        setDetails(response.data);
        console.log('Fetched JSON:', response.data); 
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }

      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setCast(creditsResponse.data.cast);
      console.log('Fetched Cast', creditsResponse.data);
    };

    fetchDetails(); 
  }, [id]);
  useEffect(() => {
  if (!id || !details?.number_of_seasons) return;

  const fetchCurrentSeason = async () => {
    try {
      const seasonResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${details.number_of_seasons}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      console.log("Fetched Season", seasonResponse.data);
    } catch (error) {
      console.error("Error fetching season:", error);
    }
  };

  fetchCurrentSeason();
}, [details, id]);

  

  if (!details) return <p className="text-center p-4">Loading...</p>;

return (
  <div className="bg-gray-800 min-h-screen p-8 text-white">
    <div>
      <button
        className="bg-white hover:bg-orange-700 text-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => router.push('/')}
      >
        Home
      </button>
    </div>

    <h1 className="text-3xl font-bold ml-[20%] mt-4">{details.name}</h1>
    <h2 className="text-md font-semibold ml-[20%] mb-4">
      {details.number_of_seasons} Seasons | {details.first_air_date.slice(0, 4)} -{' '}
      {details.in_production ? 'Present' : details.last_air_date.slice(0, 4)} |{' '}
      {details.genres.map((g: Genre) => g.name).join(', ')} | TV Series
    </h2>

    <div className="flex ml-[20%] gap-8">
      <Image
        src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
        alt={details.title}
        className="rounded-lg object-cover"
        width={300}
        height={450}
      />
      <div className="max-w-xl">
        <h1 className="text-lg font-semibold mb-2">Overview</h1>
        <p className="mb-6">{details.overview}</p>
      </div>
    </div>

    <h2 className="mt-12 ml-[20%] text-xl font-bold">Top Cast</h2>
    <div className="flex ml-[20%] gap-8 mt-4">
      {cast.slice(0, 3).map((member) => (
        <div key={member.id} className="flex flex-col items-center text-center w-[150px]">
          {member.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/original/${member.profile_path}`}
              alt={member.name}
              className="rounded-lg object-cover"
              width={250}
              height={250}
            />
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-700 rounded-lg flex items-center justify-center">
              No Image
            </div>
          )}
          <span className="mt-2 font-semibold text-sm">{member.name}</span>
        </div>
      ))}
    </div>
  </div>
);
}
export default TelevisionDetails;
