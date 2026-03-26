import { useQuery } from '@tanstack/react-query';
import { type JSX, useEffect, useRef, useState } from 'react';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type Pokemon } from '@/domain/entities/Pokemon';
import { getPokemonsByGeneration } from '@/domain/useCases/getPokemonsByGeneration';
import { getPokemonsByType } from '@/domain/useCases/getPokemonsByType';
import { GenerationFilter } from '@/presentation/components/GenerationFilter';
import { PokemonCard } from '@/presentation/components/PokemonCard';
import { TypeFilter } from '@/presentation/components/TypeFilter';
import { useGenerationFilter } from '@/presentation/hooks/useGenerationFilter';
import { usePokemons } from '@/presentation/hooks/usePokemons';
import { usePokemonSearch } from '@/presentation/hooks/usePokemonSearch';
import { useTypeFilter } from '@/presentation/hooks/useTypeFilter';

export const Pokemons = (): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const typeFilter = useTypeFilter();
  const generationFilter = useGenerationFilter();

  const { selectedTypes } = typeFilter;
  const { selectedGeneration } = generationFilter;

  const isTypeFilterActive = selectedTypes.length > 0;
  const isGenerationFilterActive = selectedGeneration !== null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    usePokemons();

  const { data: typeFilteredPokemons = [], isLoading: isTypeLoading } = useQuery<Pokemon[]>({
    queryKey: ['pokemonsByType', selectedTypes],
    queryFn: () => getPokemonsByType(pokemonRepository, selectedTypes[0] ?? ''),
    enabled: isTypeFilterActive,
  });

  const { data: generationFilteredPokemons = [], isLoading: isGenerationLoading } = useQuery<
    Pokemon[]
  >({
    queryKey: ['pokemonsByGeneration', selectedGeneration],
    queryFn: () => getPokemonsByGeneration(pokemonRepository, selectedGeneration ?? ''),
    enabled: isGenerationFilterActive,
  });

  let baseList: Pokemon[];
  if (isTypeFilterActive) {
    baseList = typeFilteredPokemons;
  } else if (isGenerationFilterActive) {
    baseList = generationFilteredPokemons;
  } else {
    baseList = data?.pages.flatMap((page) => page.pokemons) ?? [];
  }

  const filteredPokemons = usePokemonSearch(searchQuery, baseList);

  const isFiltering = isTypeFilterActive || isGenerationFilterActive;
  const isFilterLoading = isTypeLoading || isGenerationLoading;

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || isFiltering) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return (): void => { observer.disconnect(); };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isFiltering]);

  if (!isFiltering && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading Pokémon...</p>
      </div>
    );
  }

  if (!isFiltering && isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load Pokémon. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Pokédex</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokémon by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <TypeFilter filterState={typeFilter} />
      </div>

      <div className="mb-6">
        <GenerationFilter filterState={generationFilter} />
      </div>

      {isFiltering && isFilterLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {!isFiltering && (
        <div ref={loadMoreRef} className="mt-8 flex justify-center py-4">
          {isFetchingNextPage && <p className="text-sm text-gray-400">Loading more...</p>}
          {!hasNextPage && (data?.pages.flatMap((p) => p.pokemons) ?? []).length > 0 && (
            <p className="text-sm text-gray-400">All Pokémon loaded!</p>
          )}
        </div>
      )}
    </div>
  );
};
