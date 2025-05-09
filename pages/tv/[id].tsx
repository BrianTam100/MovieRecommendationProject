import { useEffect, useState } from 'react';
import TelevisionDetails from '../../src/app/TelevisionDetails';  

const TvPage = () => {
  // Check if the 'id' is a valid string or has changed
  const [hashId, setHashId] = useState<string | null>(null);

  useEffect(() => {
    // Check if there's a hash in the URL and update state accordingly
    if (window.location.hash) {
      const hashIdFromUrl = window.location.hash.slice(1); // Get the part after '#'
      setHashId(hashIdFromUrl);
    }

    const handleHashChange = () => {
      const hashIdFromUrl = window.location.hash.slice(1);
      setHashId(hashIdFromUrl);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (!hashId || typeof hashId !== 'string') return <p>Loading...</p>;

  return <TelevisionDetails id={hashId} />;
};

export default TvPage;
