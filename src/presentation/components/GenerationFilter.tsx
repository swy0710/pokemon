import { useQuery } from '@tanstack/react-query';
import { type JSX } from 'react';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type Generation } from '@/domain/entities/Generation';
import { getGenerations } from '@/domain/useCases/getGenerations';
import { type UseGenerationFilterResult } from '@/presentation/hooks/useGenerationFilter';

interface GenerationFilterProps {
  filterState: UseGenerationFilterResult;
}

const GEN_LABELS: Record<string, string> = {
  'generation-i': 'Gen I',
  'generation-ii': 'Gen II',
  'generation-iii': 'Gen III',
  'generation-iv': 'Gen IV',
  'generation-v': 'Gen V',
  'generation-vi': 'Gen VI',
  'generation-vii': 'Gen VII',
  'generation-viii': 'Gen VIII',
  'generation-ix': 'Gen IX',
};

export const GenerationFilter = ({ filterState }: GenerationFilterProps): JSX.Element => {
  const { selectedGeneration, setGeneration } = filterState;

  const { data: generations = [], isLoading } = useQuery<Generation[]>({
    queryKey: ['generations'],
    queryFn: () => getGenerations(pokemonRepository),
  });

  if (isLoading) {
    return <div className="text-sm text-gray-400">Loading generations...</div>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {generations.map((generation) => {
        const isSelected = selectedGeneration === generation.name;
        return (
          <button
            key={generation.id}
            onClick={() =>
              setGeneration(isSelected ? null : generation.name)
            }
            aria-pressed={isSelected}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              isSelected
                ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-1'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {GEN_LABELS[generation.name] ?? generation.name}
          </button>
        );
      })}
    </div>
  );
};
