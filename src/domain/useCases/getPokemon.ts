import type { Pokemon } from '@/domain/entities/Pokemon';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getPokemon = async (
  repo: PokemonRepository,
  id: number | string,
): Promise<Pokemon> => {
  return repo.getPokemon(id);
};
