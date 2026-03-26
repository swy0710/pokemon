import type { Pokemon } from '@/domain/entities/Pokemon';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export interface GetPokemonsResult {
  pokemons: Pokemon[];
  total: number;
}

export const getPokemons = async (
  repo: PokemonRepository,
  limit: number,
  offset: number,
): Promise<GetPokemonsResult> => {
  return repo.getPokemons(limit, offset);
};
