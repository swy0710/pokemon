import type { EvolutionChain } from '../entities/EvolutionChain';
import type { Generation } from '../entities/Generation';
import type { Pokemon } from '../entities/Pokemon';
import type { PokemonType } from '../entities/PokemonType';

export interface PokemonListResult {
  pokemons: Pokemon[];
  total: number;
}

export interface PokemonRepository {
  getPokemons(limit: number, offset: number): Promise<PokemonListResult>;
  getPokemon(id: number | string): Promise<Pokemon>;
  getPokemonsByType(typeId: number | string): Promise<Pokemon[]>;
  getTypes(): Promise<PokemonType[]>;
  getGenerations(): Promise<Generation[]>;
  getPokemonsByGeneration(generationId: number | string): Promise<Pokemon[]>;
  getEvolutionChain(pokemonId: number | string): Promise<EvolutionChain>;
}
