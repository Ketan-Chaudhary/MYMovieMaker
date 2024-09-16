import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./SearchIcon.svg";
import MovieCard from "./Component/MovieCard";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    // console.log(data.Search);
    setMovies(data.Search);
  };

  // useeffect
  useEffect(() => {
    fetchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>My Movie Maker</h1>

      <div className="search">
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => fetchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
