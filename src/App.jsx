import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TypePage from "./pages/TypePage";
import PokemonPage from "./pages/PokemonPage";

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/type/:typeName" element={<TypePage />} />
      <Route path="/pokemon/:pokemonName" element={<PokemonPage />} />
    </Routes>
  );
};

export default App;
