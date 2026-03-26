import type { Generation } from '@/domain/entities/Generation';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getGenerations = async (repo: PokemonRepository): Promise<Generation[]> => {
  return repo.getGenerations();
};
