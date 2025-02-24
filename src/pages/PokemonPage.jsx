import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import typeColors from "../utils/typeColors";
import BackButton from "../components/BackButton";

/**
 * Pokemon Page
 * 
 * Displays detailed information about a specific Pokémon, including its image,
 * types, stats, abilities, and additional details. Users can also play the Pokémon's cry.
 */
const PokemonPage = () => {
  const { pokemonName } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cryAudio, setCryAudio] = useState(null);

  /**
   * Fetches Pokémon data from the PokéAPI based on the pokemonName.
   * Also sets up an audio object for playing the Pokémon's cry.
   */
  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setCryAudio(new Audio(data.cries.latest));
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, [pokemonName]);

  /**
   * Handles navigation to the previous page when the back button is clicked.
   */
  const handleBackButtonClick = () => navigate(-1);

  if (loading) return <p className="text-center text-lg mt-6">Loading...</p>;

  // Get Pokémon image URL
  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  // Get Pokémon types
  const types = pokemon.types.map((type) => type.type.name);

  // Get primary type color
  const primaryTypeColor = typeColors[types[0]];

  /**
   * Plays the Pokémon's cry sound when called.
   */
  const playCry = () => {
    if (cryAudio) {
      cryAudio.currentTime = 0;
      cryAudio.volume = 0.1;
      cryAudio.play();
    }
  };

  return (
    <div className={`h-screen flex items-center justify-center p-6 ${primaryTypeColor}`}>
      {/** Back Button */}
      <BackButton onClick={handleBackButtonClick} />

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold capitalize">{pokemon.name}</h1>
        <div className="relative w-48 h-48 mx-auto">
          {/** Pokémon Image */}
          <img src={imageUrl} alt={pokemon.name} className="w-full h-full" />

          {/** Cry Button */}
          <button className="absolute top-4 right-2 text-white" onClick={playCry}>
            <FaVolumeUp size={16} className="text-black"/>
          </button>
        </div>

        {/** Pokémon Types */}
        <div className="mt-4 flex justify-center gap-2">
          {types.map((type) => (
            <span key={type} className={`px-4 py-1 rounded-full text-white text-sm font-bold ${typeColors[type]}`}>
              {type.toUpperCase()}
            </span>
          ))}
        </div>

        {/** Stats Section */}
        <div className="mt-4 w-full">
          <ul className="space-y-2">
            {pokemon.stats.map(({ stat, base_stat }) => {
              const statName = stat.name.toUpperCase();
              const percentage = Math.min((base_stat / 200) * 100, 100);
              const barColor = base_stat > 100 ? "bg-green-500" : base_stat > 60 ? "bg-yellow-500" : "bg-red-500";

              return (
                <li key={stat.name} className="text-gray-800">
                  <span className="font-bold">{statName}:</span> {base_stat}
                  <div className="w-full bg-gray-300 h-4 rounded-md overflow-hidden mt-1">
                    <div className={`h-full ${barColor} shadow-lg`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/** Abilities and Additional Info */}
        <div className="flex flex-row">
          {/** Abilities */}
          <div className="flex-1 mt-4">
            <h3 className="text-xl font-semibold">Abilities:</h3>
            <ul className="list-disc list-outside mt-2 text-left px-8">
              {pokemon.abilities.map(({ ability }) => (
                <li key={ability.name} className="capitalize text-gray-700">
                  {ability.name.replace("-", " ")}
                </li>
              ))}
            </ul>
          </div>

          {/** Height, Weight & Base Experience */}
          <div className="flex-1 mt-4">
            <h3 className="text-xl font-semibold">Info:</h3>
            <ul className="list-disc list-outside mt-2 text-left px-8">
              <li className="text-gray-700">Weight: {pokemon.weight / 10}kg</li>
              <li className="text-gray-700">Height: {pokemon.height / 10}m</li>
              <li className="text-gray-700">Base Experience: {pokemon.base_experience}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
