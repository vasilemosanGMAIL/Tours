const url = 'https://course-api.com/react-tours-project';
import Tours from './Tours';
import Tour from './Tour';
import { useEffect, useState } from 'react';
import Loading from './Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) {}
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // TODO
  if (tours.length === 0) {
    return (
      <main className="title">
        <h2>no tours left</h2>
        <button
          type="button"
          style={{ marginTop: '2rem' }}
          className="btn"
          onClick={fetchTours}
        >
          refresh
        </button>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;