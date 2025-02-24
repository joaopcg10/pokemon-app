import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import typeColors from "../utils/typeColors";
import PaginatedTable from "../components/PaginatedTable";
import BackButton from "../components/BackButton";

/**
 * Extracts the Pokémon ID from a given URL.
 * @param {string} url - The URL containing the Pokémon ID.
 * @returns {string} The extracted Pokémon ID.
 */
const getPokemonId = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};

/**
 * Renders a Pokémon entry with an image and name, linking to its details page.
 * @param {object} item - The Pokémon item to render.
 * @returns {JSX.Element} The JSX representation of a Pokémon card.
 */
const renderPokemon = item => {
  const pokemon = item.pokemon;
  const id = getPokemonId(pokemon.url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={imageUrl} alt={pokemon.name} className="mx-auto h-20 mb-2 transition transform hover:scale-125" />
      <p className="text-[clamp(10px,1.2vw,14px)] font-semibold capitalize text-center w-full break-words">{pokemon.name}</p>
    </Link>
  );
};

/**
 * Type Page
 * 
 * Displays a list of Pokémon associated with a specific type.
 * Users can search for Pokémon, navigate back, and view Pokémon details.
 */
const TypePage = () => {
  const { typeName } = useParams();
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches Pokémon of the selected type from the PokéAPI on component mount or when typeName changes.
   */
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.pokemon);
      })
      .catch((error) => console.error("Error fetching Pokémon list:", error));
  }, [typeName]);

  /**
   * Sorts the Pokémon list alphabetically by name.
   */
  const sortedPokemonList = useMemo(() => {
    return [...pokemonList].sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name));
  }, [pokemonList]);

  // Get the background color for the type
  const typeColor = typeColors[typeName] || "#A8A77A"; // Default color

  /**
   * Handles the back button click event to navigate to the previous page.
   */
  const handleBackButtonClick = () => {
    localStorage.setItem("currentPage", 0);
    navigate(-1);
  };

  /**
   * Filters the Pokémon list based on the search term.
   */
  const filteredPokemon = sortedPokemonList.filter(({ pokemon }) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen w-full flex flex-col items-center p-6 ${typeColor}`}>
      {/** Back Button */}
      <BackButton onClick={handleBackButtonClick} />

      {/** Type Title */}
      <h1 className={`text-4xl font-bold capitalize text-white px-6 py-3 rounded-lg mb-6`}>
        {typeName} Type Pokémon
      </h1>

      {/** Search Bar */}
      <div className="flex items-center bg-white rounded-lg shadow-md p-2 mb-4 w-full max-w-md h-10">
        <FaSearch className="text-gray-500 mr-2 size-6" />
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full p-2 outline-none h-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/** Paginated Table displaying filtered Pokémon */}
      <PaginatedTable 
        data={filteredPokemon}
        rows={5}
        columns={5}
        renderItem={renderPokemon}
      />
    </div>
  );
};

export default TypePage;
