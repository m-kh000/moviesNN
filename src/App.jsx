import { useEffect, useState } from "react";
import "./css/App.css";
import ScrollableMovieCards from "./ScrollableMovieCards";
import Grid from "./Grid";
import { PuffLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import ShinyText from "./ShinyText";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Y2JkMTJkYjk3NGI2MGVlNjU0MmE1OWE1ZDlhODQ0ZCIsIm5iZiI6MTc1MjMxMzE2MS45NDU5OTk5LCJzdWIiOiI2ODcyMmQ0OWQxNTBjM2NjNjVhOTdkNTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.h9_Q1zBtKrGiwTJRy9qFpvaxGDQhL4UmDla8tc2x9as";
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [search, setSearch] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(true);

  // Track liked movies by ID
  const [likedMovies, setLikedMovies] = useState(() => {
    const saved = localStorage.getItem("likedMovies");
    return saved ? JSON.parse(saved) : {};
  });

  // Save to localStorage whenever likedMovies changes
  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  const toggleView = () => {
    setIsGrid((prev) => !prev);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMes("");
    try {
      const endpoint = query
      ?`${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setErrorMes("No movies found.");
        setPopularMovies([]);
        return;
      }
// console.log(query , data);
      setPopularMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMes("Failed to fetch. Please try again.");
      setPopularMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = (movieId) => {
    setLikedMovies((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  useEffect(() => {
    fetchMovies(search);
  }, [search]);

  // Optional: Filter movies based on search
  // const displayedMovies = search
  //   ? popularMovies.filter((movie) =>
  //       movie.title?.toLowerCase().includes(search.toLowerCase())
  //     )
  //   : popularMovies;

  return (
    <div className="place-items-center w-[98vw] mt-11 mb-50">
      <div className="my-10">
        <div className="h1">
          Best Movies in&nbsp;
          <ShinyText
            text="MKovies"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </div>

        <input
          type="search"
          placeholder="Search for movies"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {search && (
        <p className="opacity-50 my-10">Search results for "{search}"</p>
      )}

      {isLoading ? (
        <PuffLoader color="#768d91" size={50} />
      ) : errorMes ? (
        <p className="text-red-500">{errorMes}</p>
      ) : (
        <div id="popular-container" className="w-[95vw]">
          <div className="section ">
            <h2>Popular Movies</h2>
            <button id="toggle-view" onClick={toggleView}>
              <img src={isGrid ? "./img/scr.png":"./img/grid.png"} className="icon"/>
            </button>
          </div>

          {isGrid ? (
            <Grid
              popularMovies={popularMovies}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          ) : (
            <ScrollableMovieCards
              movies={popularMovies}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
