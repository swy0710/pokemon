export interface PokemonStat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  stats: PokemonStat[];
  moves: string[];
  height: number;
  weight: number;
  speciesId: number;
}
