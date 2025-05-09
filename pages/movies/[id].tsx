import { useRouter } from 'next/router';
import MovieDetails from '../../components/MovieDetails';

const MoviePage = () => {
  const router = useRouter();
  const { id, category } = router.query; 

  if (!id || typeof id !== 'string' || !category || typeof category !== 'string') return null;

  return <MovieDetails category={category} />;
};

export default MoviePage;
