import type { Pokemon } from '@/domain/entities/Pokemon';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getPokemonsByGeneration = async (
  repo: PokemonRepository,
  generationId: number | string,
): Promise<Pokemon[]> => {
  return repo.getPokemonsByGeneration(generationId);
};
