import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon, Pokemon } from "./utils/pokemon";
import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      //all pokemon data
      let res = await getAllPokemon(initialURL);
      //each pokemon data
      loadPokemon(res.results);
      // console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (
    data: { name: string; url: string }[]
  ): Promise<void> => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => getPokemon(pokemon.url))
    );
    setPokemonData(_pokemonData);
  };

  // console.log(pokemonData);

  const handleNextPage = async () => {
    if (nextURL) { // 次のページが存在する場合のみ処理を続行
      setLoading(true);
      try {
        let res = await getAllPokemon(nextURL);
        setNextURL(res.next);       // 次のページの URL を設定
        setPrevURL(res.previous);  // 前のページの URL を設定
        loadPokemon(res.results);  // ポケモンデータを読み込む
      } catch (error) {
        console.error("次のページの取得中にエラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  const handlePrevPage = async () => {
    if (prevURL) { // 前のページが存在する場合のみ処理を続行
      setLoading(true);
      try {
        let res = await getAllPokemon(prevURL);
        setNextURL(res.next);       // 次のページの URL を設定
        setPrevURL(res.previous);  // 前のページの URL を設定
        loadPokemon(res.results);  // ポケモンデータを読み込む
      } catch (error) {
        console.error("前のページの取得中にエラーが発生しました", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon: Pokemon, i: number) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}  disabled={!nextURL}>前へ</button>
              <button onClick={handleNextPage}  disabled={!nextURL}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
