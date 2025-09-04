// App.jsx
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ScrollableMovieCards from "./ScrollableMovieCards"; 

const API_BASE_URL = 'https://api.themoviedb.org/3';    //API STUFF
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};


function App() {
  const [search, setSreach] = useState(""); // search
  function handlesearch(e) {
    setSreach(e.target.value);
  }


const [errorMes,setErrorMes] = useState("");
const fetchMovies = async () => {
    try {
        const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        setErrorMes("Failed to fetch movies");
      }
      const data = await response.json();

    } 
    catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMes("Error fetching. Try again");
    }
  };

  useEffect(()=>{
fetchMovies();
  },[])

  
  const popularMovies = [
    { title: "Wednesday", img: "./Wednesday.jpg", year: 2024, rating: 4.9, isLiked: false },
    { title: "Inception", img: "./Inception.jpg", year: 2010, rating: 4.8, isLiked: true },
    { title: "Interstellar", img: "./Interstellar.jpg", year: 2014, rating: 4.9, isLiked: false },
    { title: "The Matrix", img: "./The Matrix.jpg", year: 1999, rating: 4.7, isLiked: true },
    { title: "Dune", img: "./Dune.jpg", year: 2021, rating: 4.6, isLiked: false },
  ];

  return (
    <div className="place-items-center w-[98vw]">
      <div className="my-70">
        <h1>Best Movies in MKovies </h1>
        <input
          type="search"
          placeholder="search for movies"
          value={search}
          onChange={handlesearch}
        />
      </div>
      {errorMes && <p className="text-red-500">{errorMes}</p>}
      {search ? (
        <p className="opacity-50 my-10">search results for {search}</p>
      ) : null}
      <div id="popular-container" className="w-[95vw]">
        <p className="px-30 text-left">Popular Movies</p>
        <ScrollableMovieCards movies={popularMovies} />
      </div>
    </div>
  );
}

export default App;