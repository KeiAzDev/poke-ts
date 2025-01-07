// PokemonリストのAPIレスポンス
interface PokemonListResponse {
  results: { name: string; url: string }[];
}

// 個別のポケモンデータ
interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  // 必要に応じて他のプロパティを追加
}

export const getAllPokemon = async (url: string): Promise<PokemonListResponse> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  return res.json();
};

export const getPokemon = async (url: string): Promise<Pokemon> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }
  return res.json();
};
