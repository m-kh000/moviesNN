import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import FavoritesPage from "./FavoritesPage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<FavoritesPage />} />
      </Routes>
    </main>
  );
}

export default App;
