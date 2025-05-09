import { useRouter } from 'next/router';
import TelevisionDetails from '../../src/app/TelevisionDetails';  

const TvPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') return <p>Loading...</p>;

  return <TelevisionDetails id={id} />;
};

export default TvPage;
