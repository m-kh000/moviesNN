import { useEffect, useState } from "react";
import {useDebounce} from "react-use";
import "./css/App.css";
import ScrollableMovieCards from "./ScrollableMovieCards";
import Grid from "./Grid";
import { PuffLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import ShinyText from "./ShinyText";
import scr from "/img/scr.png";
import grid from "/img/grid.png";
import { getTrendingMovies, updateCount } from "./appwrite";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};


function App() {
  const [search, setSearch] = useState("");
  const [debouseSearch,setDebouseSearch] = useState("")
  const [errorMes, setErrorMes] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(true);

  useDebounce(
    () => {
      setDebouseSearch(search)
    },
    1000,       //time in ms
    [search]    //dep
  );
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
      setPopularMovies(data.results);

      if(query && data.results.length > 0){
        updateCount(query,data.results[0]);
    }

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
    const fetchTrending = async () => {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    };
    fetchTrending();
  },[])

  useEffect(() => {
    fetchMovies(debouseSearch);
  }, [debouseSearch]);

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

        {/* {trendingMovies.map((movie,index) => (<div key={movie.$id} className="flex">
          <p>{index+1}</p>
          <img src={movie.poster_url} alt="poster" style={{width: '50px'}}/>
          </div>))} */}
      

        <input
          type="search"
          placeholder="Search for movies"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>


      {isLoading ? (
        <PuffLoader color="#768d91" size={50} />
      ) : errorMes ? (
        <p className="text-red-500">{errorMes}</p>
      ) : (
        <div id="popular-container" className="w-[95vw]">
          <div className="section ">
            <h2>{debouseSearch.length == 0 ?"Popular Movies":`Search results for ${debouseSearch}`}</h2>
            <button id="toggle-view" onClick={toggleView}>
              <img src={isGrid ? scr : grid} className="icon"/>
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
