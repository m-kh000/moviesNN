import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import "./css/App.css";
import { PuffLoader } from "react-spinners";
import ShinyText from "./ShinyText";
import TrendingSection from "./TrendingSection";
import PopularSection from "./PopularSection";
import FavoritesSection from "./FavoritesSection";
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
      settextAboveSearch("Popular Movies");
    } else if (debouseSearch.length >= 4) {
      fetchMovies(debouseSearch);
      settextAboveSearch(`Search results for ${debouseSearch}`);
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

      <TrendingSection trendingMovies={trendingMovies} />

      <input
        type="search"
        placeholder="Search for movies"
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      {isLoading ? (
        <PuffLoader color="#768d91" size={50} className="m-20" />
      ) : errorMes ? (
        <p className="text-red-500">{errorMes}</p>
      ) : (
        <PopularSection
          movies={movies}
          likedMovies={likedMovies}
          textAboveSearch={textAboveSearch}
          isGrid={t1isGrid}
          onToggleView={() => toggleView(set1IsGrid)}
          onToggleLike={toggleLike}
          
        />
      )}

      <FavoritesSection
        likedMovies={likedMovies}
        isGrid={t2isGrid}
        onToggleView={() => toggleView(set2IsGrid)}
        onToggleLike={toggleLike}
      />
    </div>
  );
}

export default App;
