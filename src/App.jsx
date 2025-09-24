import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import "./css/App.css";
import ScrollableMovieCards from "./ScrollableMovieCards";
import Grid from "./Grid";
import { PuffLoader } from "react-spinners";
import MovieCard from "./MovieCard";
import ShinyText from "./ShinyText";
import scr from "/img/scr.svg";
import grid from "/img/grid.svg";
import pl from "/img/img pl.svg";
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
  const [debouseSearch, setDebouseSearch] = useState("");
  const [textAboveSearch, settextAboveSearch] = useState("");
  const [errorMes, setErrorMes] = useState("");
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [t1isGrid, set1IsGrid] = useState(true);
  const [t2isGrid, set2IsGrid] = useState(false);
  const [likedMovies, setLikedMovies] = useState(() => {

    
    const saved = localStorage.getItem("likedMovies");
    return saved ? JSON.parse(saved) : {};
  });

  useDebounce(
    () => {
      setDebouseSearch(search);
    },
    1000, //time in ms
    [search] //dep
  );

  const toggleView = (f) => {
    f((prev) => !prev);
  };
  const toggleLike = (movie) => {
    setLikedMovies((prev) => {
      if (prev[movie.id]) {
        const { [movie.id]: removed, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [movie.id]: movie };
      }
    });
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMes("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        setErrorMes("No movies found.");
        setMovies([]);
        return;
      }
      setMovies(data.results);

      if (query && data.results.length > 0) {
        updateCount(query, data.results[0]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMes("Failed to fetch. Please try again.");
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      const trending = await getTrendingMovies();
      setTrendingMovies(trending);
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (debouseSearch.length == 0) {
      fetchMovies();
      settextAboveSearch("Popular Movies")
    }else if( debouseSearch.length >= 4){
      fetchMovies(debouseSearch);
      settextAboveSearch(`Search results for ${debouseSearch}`)
    }
    // For lengths 1-3, do nothing - keep previous results
  }, [debouseSearch]);

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    console.log("Saved to localStorage:", likedMovies);
    console.log("Object.values(likedMovies):", Object.values(likedMovies));
    console.log("movies:", movies);
  }, [likedMovies]);

  return (
    <div className="place-items-center mt-11 mb-50">
      <div className="w-[110vw] sm:w-[98vw] my-10">
        <div className="h1 ">
          Best Movies in&nbsp;
          <ShinyText
            text="MKovies"
            disabled={false}
            speed={3}
            className="custom-class"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center place-items-center max-w-[98vw] ">
        {Array.from({ length: 5 }).map((_, index) => {
          const movie = trendingMovies[index];
          return (
            <div
              key={movie?.$id || index}
              className="flex place-items-center justify-center lg:basis-1/5 basis-1/3 "
            >
              <p
                className="font-bold text-[24vw] lg:text-[15vw]"
                style={{
                  WebkitTextStroke: "1px #96aaa9",
                  color: "transparent",
                }}
              >
                {index + 1}
              </p>
              {movie ? (
                movie.poster_url != "https://image.tmdb.org/t/p/w500null" ? (
                  <img //must be same as
                    src={movie.poster_url}
                    alt="poster"
                    className="w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8"
                  />
                ) : (
                  //this
                  <div className=" bg-[#1d2129ee] sm:bg-[#1a1a25ee] place-items-center w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8">
                    <div className="w-fit h-full flex place-items-center">
                      <img src={pl} className="w-8 h-8" />
                    </div>
                  </div>
                )
              ) : (
                <div //and this
                  className=" animate-pulse w-18 h-26 rounded-2xl sm:w-28 sm:h-42 shadow-black -translate-x-5 sm:-translate-x-8"
                  style={{ backgroundColor: "#7a8e8d" }}
                />
              )}
            </div>
          );
        })}
      </div>

      <input
        type="search"
        placeholder="Search for movies"
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {isLoading ? (
        <PuffLoader color="#768d91" size={50} className="m-20"/>
      ) : errorMes ? (
        <p className="text-red-500">{errorMes}</p>
      ) : (
        <div id="popular-container" className="w-[95vw]">
          <div className="section ">
            <h2>
              {textAboveSearch}
            </h2>
            <button id="toggle-view" onClick={() => toggleView(set1IsGrid)}>
              <img src={t1isGrid ? scr : grid} className="icon" />
            </button>
          </div>

          {t1isGrid ? (
            <Grid
              popularMovies={movies}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          ) : (
            <ScrollableMovieCards
              movies={movies}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          )}
        </div>
      )}

      {Object.keys(likedMovies).length > 0 && (
        <div id="fav-container" className="w-[95vw]">
          <div className="section">
            <h2>Favorites</h2>
            <button id="toggle-fav-view" onClick={() => toggleView(set2IsGrid)}>
              <img src={t2isGrid ? scr : grid} className="icon" />
            </button>
          </div>

          {t2isGrid ? (
            <Grid
              popularMovies={Object.values(likedMovies)}
              onToggleLike={toggleLike}
              likedMovies={likedMovies}
            />
          ) : (
            <ScrollableMovieCards
              movies={Object.values(likedMovies)}
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
