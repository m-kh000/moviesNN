// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import ScrollableMovieCards from "./ScrollableMovieCards";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

function App() {
  const [search, setSearch] = useState(""); // ✅ Optional: fix typo
  const [errorMes, setErrorMes] = useState("");
  const [popularMovies, setPopularMovies] = useState([]); // ✅ Store fetched movies
  const [isLoading,setIsLoading] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async () => {

    setIsLoading(true);
    setErrorMes('')

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
 
      if (!response.ok) {
        setErrorMes("Failed to fetch movies");
      }
      const data = await response.json();
      if(data.response === "False"){
        setErrorMes("Failed to fetch movies");
        setPopularMovies([]);
        return;
      }
      setPopularMovies(data.results);


    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMes("Failed to fetch. Please try again.");
      
    } finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="place-items-center w-[98vw]">
      <div className="my-10">
        <h1>Best Movies in MKovies</h1>
        <input
          type="search"
          placeholder="Search for movies"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>


      {search && <p className="opacity-50 my-10">Search results for "{search}"</p>}
        
        
        {isLoading ? (
  <p>Is loading...</p>
) : errorMes ? (
  <p className="text-red-500">{errorMes}</p>
) : (
  <div id="popular-container" className="w-[95vw]">
    <h2 className="px-3 text-left">Popular Movies</h2>
    <ScrollableMovieCards movies={popularMovies} />
  </div>
)}
      
    </div>
  );
}

export default App;