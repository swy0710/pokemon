import { useQuery } from '@tanstack/react-query';
import { type JSX } from 'react';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type PokemonType } from '@/domain/entities/PokemonType';
import { getPokemonTypes } from '@/domain/useCases/getPokemonTypes';
import { type UseTypeFilterResult } from '@/presentation/hooks/useTypeFilter';

interface TypeFilterProps {
  filterState: UseTypeFilterResult;
}

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-gray-300 text-gray-800',
  fighting: 'bg-red-700 text-white',
  flying: 'bg-blue-300 text-blue-900',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-yellow-600 text-white',
  rock: 'bg-yellow-700 text-white',
  bug: 'bg-green-500 text-white',
  ghost: 'bg-purple-800 text-white',
  steel: 'bg-gray-400 text-gray-900',
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-green-400 text-white',
  electric: 'bg-yellow-400 text-yellow-900',
  psychic: 'bg-pink-500 text-white',
  ice: 'bg-cyan-300 text-cyan-900',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-700 text-white',
  fairy: 'bg-pink-300 text-pink-900',
  stellar: 'bg-indigo-400 text-white',
  unknown: 'bg-gray-200 text-gray-600',
};

export const TypeFilter = ({ filterState }: TypeFilterProps): JSX.Element => {
  const { selectedTypes, toggleType, clearTypes } = filterState;

  const { data: types = [], isLoading } = useQuery<PokemonType[]>({
    queryKey: ['pokemon-types'],
    queryFn: () => getPokemonTypes(pokemonRepository),
  });

  if (isLoading) {
    return <div className="text-sm text-gray-400">Loading types...</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedTypes.includes(type.name);
          const colorClass = TYPE_COLORS[type.name] ?? 'bg-gray-200 text-gray-700';
          return (
            <button
              key={type.id}
              onClick={() => toggleType(type.name)}
              aria-pressed={isSelected}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-all ${colorClass} ${
                isSelected ? 'ring-2 ring-offset-1 ring-gray-700 scale-105' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {type.name}
            </button>
          );
        })}
      </div>
      {selectedTypes.length > 0 && (
        <button
          onClick={clearTypes}
          className="mt-2 text-xs text-blue-500 hover:underline"
        >
          ✕ 필터 초기화
        </button>
      )}
    </div>
  );
};
