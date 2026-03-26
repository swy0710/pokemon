import type { NamedApiResourceDto } from './PokemonDto';

export interface EvolutionDetailDto {
  gender: number | null;
  held_item: NamedApiResourceDto | null;
  item: NamedApiResourceDto | null;
  known_move: NamedApiResourceDto | null;
  known_move_type: NamedApiResourceDto | null;
  location: NamedApiResourceDto | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedApiResourceDto | null;
  party_type: NamedApiResourceDto | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedApiResourceDto | null;
  trigger: NamedApiResourceDto;
  turn_upside_down: boolean;
}

export interface ChainLinkDto {
  is_baby: boolean;
  species: NamedApiResourceDto;
  evolution_details: EvolutionDetailDto[];
  evolves_to: ChainLinkDto[];
}

export interface EvolutionChainDto {
  id: number;
  baby_trigger_item: NamedApiResourceDto | null;
  chain: ChainLinkDto;
}
