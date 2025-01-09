// PokemonリストのAPIレスポンス
interface PokemonListResponse {
  results: { name: string; url: string }[];
  next: string | null; // 次のページのURL
  previous: string | null; // 前のページのURL (必要であれば)
}

// 個別のポケモンデータ
export interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[]; // types の型を追加
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
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
