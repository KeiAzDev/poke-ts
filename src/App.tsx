import { useEffect } from 'react';
import './App.css'

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await hetAllPokemon(initialURL);
    }
  },[])

  return (
    <>
      
    </>
  )
}

export default App
