import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../components/globals.css'
import Image from 'next/image'
type Person = {
  name: string;
  biography: string;
  profile_path: string;
}

type Credits = {
  original_title: string;
}

type MovieCreditsResponse = {
  cast: Credits[];
  crew: Credits[];
};

const PersonDetails = () => {
    
    const router = useRouter();
    const { id } = router.query;
    const [person, setPerson] = useState<Person>();
    const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';


  useEffect(() => {
    if (!id) return;  
    const fetchDetails = async () => {
        const personDetails = await axios.get<Person>(`https://api.themoviedb.org/3/person/${id}`, {
              headers: {
                accept: 'application/json',
                 Authorization: `Bearer ${API_KEY}`,

              },
            });
        setPerson(personDetails.data);
        console.log(personDetails)
        

        const movieCredits = await axios.get<MovieCreditsResponse>(`https://api.themoviedb.org/3/person/${id}/movie_credits`, {
              headers: {
                accept: 'application/json',
                 Authorization: `Bearer ${API_KEY}`,

              },
            });
        setCredits(movieCredits.data.cast);
        console.log(movieCredits);
        }
    fetchDetails();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className = "min-h-screen p-8 text-white bg-gradient-to-r from-gray-950 via-slate-800 to-gray-950">
    <button
        className="bg-white hover:bg-sky-400 text-gray-700 font-bold py-2 px-4 rounded"
        onClick={() => router.push('/')}
      >
        Home
      </button>
    <h1 className = "w-3/5 text-bold text-4xl ml-[20%]"
    >{person?.name}</h1>
    <Image
      src={`https://image.tmdb.org/t/p/original/${person?.profile_path}`}
      alt=""
      className="w-1/5 max-w-md rounded-lg object-cover ml-[20%] m-4"
      width={300}
      height={450}
    />
    <h2 className='ml-[20%] w-3/5'>
      {person?.biography}
    </h2>
    </div>

  );
};

export default PersonDetails;
