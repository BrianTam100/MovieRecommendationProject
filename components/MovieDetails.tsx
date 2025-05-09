import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from 'axios';
import './globals.css';
type Actors = {
    name: string;
    character: string;
    id: number;
  };


interface MediaType {
    category : string;
    
}
const MovieDetails = ( { category } : MediaType) => {
  const router = useRouter();
  const [details, setDetails] = useState<any>(null); 
  const [cast, setCast] = useState<Actors[]>([]); 
  const [releaseDates, setReleaseDates] = useState<any>(null);
  const [trailer, setTrailer] = useState<any>(null);
  const { id } = router.query;
  
  const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDI0MmE0OTFmZTAzNzc2NzNhODg0YzQ3ODM0NWQzZiIsIm5iZiI6MTc0MzI3MTEwNi44MDcwMDAyLCJzdWIiOiI2N2U4MzRjMmYxZjUzNzY4NzVkZGM5MTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6GroeQplHcTJBZxSZE1D63cRNPZNZDr7ordhOIoSCM';

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      const type = category === "tv" ? "tv": "movie";
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`, {
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

      const creditsResponse = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setCast(creditsResponse.data.cast);
      console.log('Fetched Cast', creditsResponse.data);
      const releaseDates = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/release_dates`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setReleaseDates(releaseDates.data.results);
      console.log('Fetched Dates', releaseDates.data);
      const trailer = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        }
      });
      setTrailer(trailer.data);
      console.log('Fetched Trailer', trailer.data);
    };
    

    fetchDetails(); 
  }, [id]);

  if (!details) return <p className="text-center p-4">Loading...</p>;
  const usRelease = releaseDates?.find((region: any) => region.iso_3166_1 === 'US');

  const certifiedRelease = usRelease?.release_dates?.find(
    (entry: any) => entry.certification?.trim() !== '' &&
    entry.note?.trim() === ""
  );
  const fallbackRelease = usRelease?.release_dates?.[0];

  const usReleaseDate = (certifiedRelease || fallbackRelease)?.release_date;
  const usCertification = certifiedRelease?.certification || 'Unrated';

  const actualTrailer = trailer?.results?.find(
    (item: any) =>
      item.name.toLowerCase().includes("official") &&
      item.name.toLowerCase().includes("trailer") &&
      item.site === "YouTube" &&
      item.iso_3166_1 === "US"
  );
  console.log(actualTrailer?.key);

  return (
    <div className="bg-gray-800 min-h-screen p-8 text-white">
      <div >
        <button
        className = "bg-white hover:bg-orange-700 text-gray-700 font-bold py-2 px-4 rounded"
        onClick = {() => router.push('/')}
        >Home</button>
      </div>
      <h1 className="text-3xl font-bold ml-[20%]">{details.title}</h1>
      <h2 className="text-1xl font-bold ml-[20%]">
      {usReleaseDate?.slice(0, 10)} | {usCertification} |{" "}
      {details.genres.map(g => g.name).join(', ')} |{" "}
      {details.runtime > 0
      ? `${Math.floor(details.runtime / 60)} ${Math.floor(details.runtime / 60) > 1 ? 'hours' : 'hour'} ${details.runtime % 60} minutes`
      : 'Runtime: Unknown'}
      </h2>
      <div className="flex gap-8 ml-[20%] ">
      <img
        src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
        alt={details.title}
        className="w-3/5 max-w-md rounded-lg object-cover"
      />
      <iframe
        width="800"
        height="700"
        src={`https://www.youtube.com/embed/${actualTrailer?.key}`}
        title="YouTube trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
      <p className="max-w-2xl text-lg ml-[20%]">{details.overview}</p>
      <div className="ml-[20%]">
    </div>
    <p className = "ml-[20%]">
    Starring  
      {cast.slice(0, 3).map((member) => (
          <span key={member.id}> {member.name}, </span>
        ))}
    </p>
    </div>
  );
}

export default MovieDetails;
