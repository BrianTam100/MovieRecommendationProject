import { useEffect, useState } from 'react';
import MovieDetails from '../../components/MovieDetails';

const MoviePage = () => {
  const [hashId, setHashId] = useState<string | null>(null);
  const [hashCategory, setHashCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); 
      const [category, id] = hash.split('/'); 

      setHashCategory(category || null); 
      setHashId(id || null); 
    };

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  if (!hashId || !hashCategory) return null;

  return <MovieDetails category={hashCategory} />; 
};

export default MoviePage;
