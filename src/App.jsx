import "./css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<FavoritesPage />} />
      </Routes>
    </main>
    </div>
  );
}

export default App;
