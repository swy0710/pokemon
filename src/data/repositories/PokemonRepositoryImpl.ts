import {
  fetchEvolutionChain,
  fetchGenerationDetail,
  fetchGenerationList,
  fetchPokemonDetail,
  fetchPokemonList,
  fetchPokemonSpecies,
  fetchTypeDetail,
  fetchTypeList,
} from '../api/pokemonApi';

import type { EvolutionChain, EvolutionNode } from '../../domain/entities/EvolutionChain';
import type { Generation } from '../../domain/entities/Generation';
import type { Pokemon } from '../../domain/entities/Pokemon';
import type { PokemonType } from '../../domain/entities/PokemonType';
import type { PokemonListResult, PokemonRepository } from '../../domain/repositories/PokemonRepository';
import type { ChainLinkDto } from '../dto/EvolutionDto';
import type { PokemonDetailDto } from '../dto/PokemonDto';

function extractIdFromUrl(url: string): number {
  const parts = url.replace(/\/$/, '').split('/');
  return Number(parts[parts.length - 1]);
}

function mapPokemonDetailToEntity(dto: PokemonDetailDto): Pokemon {
  const officialArtwork =
    dto.sprites.other['official-artwork'].front_default ?? dto.sprites.front_default ?? '';

  return {
    id: dto.id,
    name: dto.name,
    imageUrl: officialArtwork,
    types: dto.types
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
    stats: dto.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    moves: dto.moves.slice(0, 4).map((m) => m.move.name),
    height: dto.height,
    weight: dto.weight,
    speciesId: extractIdFromUrl(dto.species.url),
  };
}

function mapChainLinkToEvolutionNode(link: ChainLinkDto): EvolutionNode {
  return {
    speciesName: link.species.name,
    speciesId: extractIdFromUrl(link.species.url),
    evolvesTo: link.evolves_to.map(mapChainLinkToEvolutionNode),
  };
}

export const pokemonRepositoryImpl: PokemonRepository = {
  async getPokemons(limit: number, offset: number): Promise<PokemonListResult> {
    const listDto = await fetchPokemonList(limit, offset);

    const pokemons = await Promise.all(
      listDto.results.map(async (resource) => {
        const id = extractIdFromUrl(resource.url);
        const detail = await fetchPokemonDetail(id);
        return mapPokemonDetailToEntity(detail);
      }),
    );

    return { pokemons, total: listDto.count };
  },

  async getPokemon(id: number | string): Promise<Pokemon> {
    const detail = await fetchPokemonDetail(id);
    return mapPokemonDetailToEntity(detail);
  },

  async getPokemonsByType(typeId: number | string): Promise<Pokemon[]> {
    const typeDto = await fetchTypeDetail(typeId);

    const pokemons = await Promise.all(
      typeDto.pokemon.map(async (entry) => {
        const pokemonId = extractIdFromUrl(entry.pokemon.url);
        const detail = await fetchPokemonDetail(pokemonId);
        return mapPokemonDetailToEntity(detail);
      }),
    );

    return pokemons;
  },

  async getTypes(): Promise<PokemonType[]> {
    const listDto = await fetchTypeList();

    return listDto.results.map((resource) => ({
      id: extractIdFromUrl(resource.url),
      name: resource.name,
    }));
  },

  async getGenerations(): Promise<Generation[]> {
    const listDto = await fetchGenerationList();

    return listDto.results.map((resource) => ({
      id: extractIdFromUrl(resource.url),
      name: resource.name,
    }));
  },

  async getPokemonsByGeneration(generationId: number | string): Promise<Pokemon[]> {
    const generationDto = await fetchGenerationDetail(generationId);

    const pokemons = await Promise.all(
      generationDto.pokemon_species.map(async (speciesRef) => {
        const detail = await fetchPokemonDetail(speciesRef.name);
        return mapPokemonDetailToEntity(detail);
      }),
    );

    return pokemons;
  },

  async getEvolutionChain(pokemonId: number | string): Promise<EvolutionChain> {
    const speciesDto = await fetchPokemonSpecies(pokemonId);
    const chainId = extractIdFromUrl(speciesDto.evolution_chain.url);
    const chainDto = await fetchEvolutionChain(chainId);

    return {
      id: chainDto.id,
      chain: mapChainLinkToEvolutionNode(chainDto.chain),
    };
  },
};
