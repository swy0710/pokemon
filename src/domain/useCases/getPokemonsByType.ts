import type { Pokemon } from '@/domain/entities/Pokemon';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getPokemonsByType = async (
  repo: PokemonRepository,
  typeId: number | string,
): Promise<Pokemon[]> => {
  return repo.getPokemonsByType(typeId);
};
