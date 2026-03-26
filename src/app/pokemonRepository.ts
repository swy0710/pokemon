import { pokemonRepositoryImpl } from '@/data/repositories/PokemonRepositoryImpl';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const pokemonRepository: PokemonRepository = pokemonRepositoryImpl;
