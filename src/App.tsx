import { useEffect, useState } from 'react';
import './App.css'
import { getAllPokemon, getPokemon, Pokemon } from './utils/pokemon';
import Card from './components/card/Card';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //all pokemon data
      let res = await getAllPokemon(initialURL);
      //each pokemon data
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  },[]);

  const loadPokemon = async (data: { name: string; url: string }[]): Promise<void> => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => getPokemon(pokemon.url))
    );
    setPokemonData(_pokemonData);
  };

  console.log(pokemonData);

  return (
    <div className='App'>
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (<>
      <div className="pokemonCardContainer">
        {pokemonData.map((pokemon: Pokemon, i: number) => {
          return <Card key={i} pokemon={pokemon} />
        })}
      </div>
      </>)}
    </div>
  )
}

export default App
