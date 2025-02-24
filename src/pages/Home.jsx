import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import typeColors from "../utils/typeColors";

/**
 * Home Page
 * 
 * This page fetches Pokémon types from the PokéAPI and displays them in a styled grid.
 * Each type is displayed as a clickable link that navigates to a specific type page.
 */
const Home = () => {
  const [types, setTypes] = useState([]);

  /**
   * Fetch Pokémon types from the PokéAPI on component mount.
  */
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type?limit=30&offset=0")
      .then((res) => res.json())
      .then((data) => setTypes(data.results))
      .catch((error) => console.error("Error fetching Pokémon types:", error));
  }, []);

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
      {/* Header section */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Pokémon Types</h1>

      <div className="flex-1" />

      {/* Grid layout for displaying Pokémon types */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {types.map((type) => (
          <Link
            key={type.name}
            to={`/type/${type.name}`}
            className={`flex items-center justify-center p-4 rounded-lg shadow-lg transition transform hover:scale-105 capitalize text-white text-lg font-semibold ${typeColors[type.name]}`}
          >
            {type.name}
          </Link>
        ))}
      </div>

      <div className="flex-1" />
    </div>
  );
};

export default Home;
