import ky from 'ky';

import type { EvolutionChainDto } from '../dto/EvolutionDto';
import type {
  GenerationDetailDto,
  GenerationListResponseDto,
  PokemonDetailDto,
  PokemonListResponseDto,
  PokemonSpeciesDto,
} from '../dto/PokemonDto';
import type { TypeDetailDto, TypeListResponseDto } from '../dto/TypeDto';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = ky.create({ prefixUrl: API_BASE_URL });

export function fetchPokemonList(limit: number, offset: number): Promise<PokemonListResponseDto> {
  return api.get('pokemon', { searchParams: { limit, offset } }).json<PokemonListResponseDto>();
}

export function fetchPokemonDetail(idOrName: number | string): Promise<PokemonDetailDto> {
  return api.get(`pokemon/${idOrName}`).json<PokemonDetailDto>();
}

export function fetchTypeDetail(idOrName: number | string): Promise<TypeDetailDto> {
  return api.get(`type/${idOrName}`).json<TypeDetailDto>();
}

export function fetchTypeList(): Promise<TypeListResponseDto> {
  return api.get('type').json<TypeListResponseDto>();
}

export function fetchGenerationList(): Promise<GenerationListResponseDto> {
  return api.get('generation').json<GenerationListResponseDto>();
}

export function fetchGenerationDetail(idOrName: number | string): Promise<GenerationDetailDto> {
  return api.get(`generation/${idOrName}`).json<GenerationDetailDto>();
}

export function fetchPokemonSpecies(idOrName: number | string): Promise<PokemonSpeciesDto> {
  return api.get(`pokemon-species/${idOrName}`).json<PokemonSpeciesDto>();
}

export function fetchEvolutionChain(id: number | string): Promise<EvolutionChainDto> {
  return api.get(`evolution-chain/${id}`).json<EvolutionChainDto>();
}
