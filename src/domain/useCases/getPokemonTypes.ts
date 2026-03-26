import type { PokemonType } from '@/domain/entities/PokemonType';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getPokemonTypes = async (repo: PokemonRepository): Promise<PokemonType[]> => {
  return repo.getTypes();
};
