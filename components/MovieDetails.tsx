import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from 'axios';
import './globals.css';
import Link from 'next/link';
import { getReleaseInfo } from './releaseDate';
type Actor = {
  name: string;
  character: string;
  id: number;
  job: string;
  department: string;
};

type Providers = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

type Genre = {
  name: string;
};

type ReleaseDate = {
  iso_3166_1: string;
  release_dates: {
    certification: string;
    note: string;
    release_date: string;
  }[];
};

type Trailer = {
  key: string;
  name: string;
  site: string;
  iso_3166_1: string;
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
}

interface MediaType {
  category: string;
}


const MovieDetails = ({ category }: MediaType) => {
  const router = useRouter();
  
  const [details, setDetails] = useState<MediaDetails | null>(null); 
  const [cast, setCast] = useState<Actor[]>([]); 
  const [credits, setCredits] = useState<Actor[]>([]);
  const [releaseDates, setReleaseDates] = useState<ReleaseDate[] | null>(null);
  const [trailer, setTrailer] = useState<{ results: Trailer[] } | null>(null);
  const [producer, setProducer] = useState<Actor | null>(null);
  const { id } = router.query;
  const [providers, setProviders] = useState<Providers[]>([]);

  
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      const type = category === "tv" ? "tv" : "movie";
      try {
        const response = await axios.get<MediaDetails>(`https://api.themoviedb.org/3/${type}/${id}`, {
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

      const creditsResponse = await axios.get<{ cast: Actor[] }>(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      const crewResponse = await axios.get<{ crew: Actor[] }>(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setCast(creditsResponse.data.cast);
      setCredits(crewResponse.data.crew);
      console.log('Fetched Cast', creditsResponse.data);

      const releaseDatesResponse = await axios.get<{ results: ReleaseDate[] }>(`https://api.themoviedb.org/3/${type}/${id}/release_dates`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setReleaseDates(releaseDatesResponse.data.results);
      console.log('Fetched Dates', releaseDatesResponse.data);

      const trailerResponse = await axios.get<{ results: Trailer[] }>(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setTrailer(trailerResponse.data);
      console.log('Fetched Trailer', trailerResponse.data);

      const countryCode = 'US';

      const providerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        }
      });
      const allResults = providerResponse.data.results;
      const countryProviders = allResults[countryCode] || {};

      const flatrate = countryProviders.flatrate || [];
      const buy = countryProviders.buy || [];
      const rent = countryProviders.rent || [];

      const allProviders = [...flatrate, ...buy, ...rent];
      console.log('All providers:', allProviders);
      setProviders(allProviders);

 


      
      


    };
    
    fetchDetails(); 
  }, [id, category]);
  useEffect(() => {
  const fetchDetails2 = async () => {
    if (!credits || credits.length === 0) return;
    const director = credits.find(
      (member) => member.job === "Director" && member.department === "Directing"
    );
    
    if (!director) return;
    setProducer(director);
    console.log("Director ID being used:", director?.id);
  };

  fetchDetails2();
}, [credits]);



  if (!details) return <p className="text-center p-4">Loading...</p>;


  const actualTrailer = trailer?.results.find(
    (item) =>
      item.name.toLowerCase().includes("trailer") &&
      item.site === "YouTube" &&
      item.iso_3166_1 === "US"
  );
  console.log(actualTrailer?.key);

  const writer = credits.filter((member) => member.department === "Writing");
  const seen = new Set();
  const unique = writer.filter(member=> {
    if(seen.has(member.id)) return false;
    seen.add(member.id);
    return true;
  });
  console.log('writer', unique);
  const { usReleaseDate, usCertification } = releaseDates ? getReleaseInfo(releaseDates) : { usReleaseDate: null, usCertification: null };



function formatDate(dateString: string | number | undefined): string {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
 
      const uniqueProviders = providers.filter(
    (provider, index, self) =>
      index === self.findIndex((p) => p.provider_id === provider.provider_id)
  );
 return (
  <div className="relative">
  <div className="fixed top-0 left-0 w-full h-1/2 z-0">
  <div
    className="w-full h-full bg-cover bg-center "
    style={{
      backgroundImage: `url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
    }}
  ></div>
 <div
  className="absolute inset-0 backdrop-blur-sm"
  style={{
    background: 'linear-gradient(to top, rgba(17, 24, 39, 1) 0%, rgba(17, 24, 39, 0.85) 30%, rgba(17, 24, 39, 0.7) 60%, rgba(17, 24, 39, 0.3) 80%, rgba(17, 24, 39, 0) 100%)'
  }}
/>

  </div>
    <div 
    className="relative z-10 text-white"
    style={{
    background: 'linear-gradient(to bottom, transparent 40vh, rgb(17 24 39) 50vh)',
          }}
    >
      <div>
        <button
          className="bg-white hover:bg-sky-400 text-gray-700 font-bold py-2 px-4 rounded m-4"
          onClick={() => router.push('/')}
        >
          Home
        </button>
      </div>
      
      <h1 className="text-4xl font-bold text-white ml-[20%]">{details.title} {details.primary_release_date}</h1>
      <h2 className="text-1xl font-bold text-white ml-[20%]">
        {formatDate(usReleaseDate || details.release_date)} · {usCertification} · {' '}
        {details.genres.map((g) => g.name).join(', ')}  · {' '}
        {details.runtime > 0
          ? `${Math.floor(details.runtime / 60)} ${
              Math.floor(details.runtime / 60) > 1 ? 'hours' : 'hour'
            } ${details.runtime % 60 - 1} minutes`
          : 'Runtime: Unknown'}{' '}
        · Rating: {details.vote_average.toFixed(1)}/10
      </h2>

      <div className="ml-[20%]">
        <div className="flex gap-8">
          <Image
            src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
            alt={details.title}
            className="w-3/5 max-w-md rounded-lg object-cover"
            width={300}
            height={450}
          />
          <iframe
            width="800"
            height="690"
            src={`https://www.youtube.com/embed/${actualTrailer?.key}`}
            title="YouTube trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
        <p className = "text-bold">Watch on prime video</p>
        <p className="w-4/5 text-lg mt-16">{details.overview}</p>
      </div>
      <p className="ml-[20%] m-4">
        Directed by:{' '}
        <Link href={`/person/${producer?.id}`} className="text-sky-500 hover:underline ml-1">
          {producer?.name}
        </Link>
      </p>
      <p className="ml-[20%] m-4">
        Written by:{' '}
        {unique.slice(0, 3).map((writer, index) => (
          <span key={writer.id}>
            <Link href={`/person/${writer.id}`} className="text-sky-500">
              {writer.name}
            </Link>
            {index < unique.slice(0, 3).length - 1 && ' · '}
          </span>
        ))}
      </p>

      <p className="ml-[20%]">
        Starring:{' '}
        {cast.slice(0, 3).map((member, index) => (
          <span key={member.id}>
            <Link href={`/person/${member.id}`} className="text-sky-500">
              {member.name}
            </Link>
            {index < cast.slice(0, 3).length - 1 && ' · '}
          </span>
        ))}
      </p>
    </div>
  </div>
);
}

export default MovieDetails;
