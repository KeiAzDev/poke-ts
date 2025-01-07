import { useEffect, useState } from 'react';
import './App.css'
import { getAllPokemon, getPokemon } from './utils/pokemon';

// 個別のポケモンデータ
interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  // 必要に応じて他のプロパティを追加
}

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
      <h1>ポケモンデータを取得しました</h1>
      </>)}
    </div>
  )
}

export default App
