export interface NamedApiResourceDto {
  name: string;
  url: string;
}

export interface PokemonListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResourceDto[];
}

export interface PokemonTypeSlotDto {
  slot: number;
  type: NamedApiResourceDto;
}

export interface PokemonStatDto {
  base_stat: number;
  effort: number;
  stat: NamedApiResourceDto;
}

export interface PokemonMoveDto {
  move: NamedApiResourceDto;
}

export interface PokemonOfficialArtworkDto {
  front_default: string | null;
}

export interface PokemonSpritesOtherDto {
  'official-artwork': PokemonOfficialArtworkDto;
}

export interface PokemonSpritesDto {
  other: PokemonSpritesOtherDto;
  front_default: string | null;
}

export interface PokemonSpeciesRefDto {
  name: string;
  url: string;
}

export interface PokemonDetailDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSpritesDto;
  types: PokemonTypeSlotDto[];
  stats: PokemonStatDto[];
  moves: PokemonMoveDto[];
  species: PokemonSpeciesRefDto;
}

export interface PokemonSpeciesDto {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
}

export interface GenerationListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResourceDto[];
}

export interface GenerationDetailDto {
  id: number;
  name: string;
  pokemon_species: NamedApiResourceDto[];
}
