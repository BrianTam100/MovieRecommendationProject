import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from 'axios';
import './globals.css';
type Actors = {
    name: string;
    character: string;
    id: number;
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

  if (!details) return <p className="text-center p-4">Loading...</p>;

  return (
    <div className="bg-gray-800 min-h-screen p-8 text-white">
      <div >
        <button
        className = "bg-white hover:bg-orange-700 text-gray-700 font-bold py-2 px-4 rounded"
        onClick = {() => router.push('/')}
        >Home</button>
      </div>
      <h1 className="text-3xl font-bold ml-[20%]">{details.name}</h1>
      <h2 className="text-1xl font-bold ml-[20%]">{details.number_of_seasons} Seasons | {details.first_air_date.slice(0, 4)} - {details.in_production != true ? details.last_air_date.slice(0, 4): "Present"} | {details.genres.map((g:Genre) => g.name).join(', ')}
      </h2>
      <div className = "flex">
      <Image
        src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
        alt={details.title}
        className="w-2/5 max-w-md rounded-lg object-cover ml-[20%]"
        width={300}  // specify the width
        height={450} // specify the height
      />
      <div className="">

      <h1 className="max-w-2xl text-lg m-4">{details.overview}</h1>
      <p className="m-4">
      Starring
      {cast.slice(0, 3).map((member, index) => (
        <span key={member.id}> {member.name}{index < cast.slice(0, 3).length - 1 && ", "}
        </span>
      ))}
      </p>
      </div>
    </div>
    </div>
  );
}

export default TelevisionDetails;
