import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";

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
