import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
type Person = {
  name: string;
  biography: string;
}

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
    }
    fetchDetails();
  }, [id]);

  if (!id) {
    return <div>Loading...</div>;
  }
  

  return (
    <div>
    <h2>{person?.biography}</h2>
    </div>

  );
};

export default PersonDetails;
