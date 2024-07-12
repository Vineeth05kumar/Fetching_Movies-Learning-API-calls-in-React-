import React, { useCallback, useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [retrying, setRetrying] = useState(false);
  // const [openForm, setOpenForm] = useState(false);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films");
      if (!response.ok) {
        throw new Error("Something went wrong....RETRYING!!!");
        // setRetrying(true);
      }
      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    // if (retrying) {
    //   setTimeout(fetchMovies, 5000);
    // }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  let content = <p>Found No Movies...</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  // const cancelSetTimeout = () => {
  //   setRetrying(false);
  // };
  const addMovies = (obj) => {
    console.log(obj);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovies} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
      {/* <button onClick={cancelSetTimeout}>CANCEL_RETRYING</button> */}
    </React.Fragment>
  );
}

export default App;
