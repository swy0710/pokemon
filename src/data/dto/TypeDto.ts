import type { NamedApiResourceDto } from './PokemonDto';

export interface TypePokemonEntryDto {
  pokemon: NamedApiResourceDto;
  slot: number;
}

export interface TypeRelationsDto {
  double_damage_from: NamedApiResourceDto[];
  double_damage_to: NamedApiResourceDto[];
  half_damage_from: NamedApiResourceDto[];
  half_damage_to: NamedApiResourceDto[];
  no_damage_from: NamedApiResourceDto[];
  no_damage_to: NamedApiResourceDto[];
}

export interface TypeDetailDto {
  id: number;
  name: string;
  damage_relations: TypeRelationsDto;
  pokemon: TypePokemonEntryDto[];
}

export interface TypeListResponseDto {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResourceDto[];
}
