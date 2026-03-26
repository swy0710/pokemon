import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import type { EvolutionNode } from '@/domain/entities/EvolutionChain';
import { useEvolutionChain } from '@/presentation/hooks/useEvolutionChain';

interface EvolutionChainProps {
  pokemonId: number | string;
}

interface EvolutionNodeViewProps {
  node: EvolutionNode;
  isFirst: boolean;
}

const EvolutionNodeView = ({ node, isFirst }: EvolutionNodeViewProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    void navigate(`/pokemon/${node.speciesId}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  };

  const hasBranches = node.evolvesTo.length > 1;
  const hasSingleEvolution = node.evolvesTo.length === 1;

  return (
    <div className="flex items-center gap-2">
      {!isFirst && (
        <span className="text-gray-400 text-sm font-medium">→</span>
      )}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          className="flex flex-col items-center rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.speciesId}.png`}
            alt={node.speciesName}
            className="h-16 w-16 object-contain"
          />
          <span className="mt-1 text-xs font-semibold capitalize text-gray-800">
            {node.speciesName}
          </span>
          <span className="text-xs text-gray-400">
            #{String(node.speciesId).padStart(4, '0')}
          </span>
        </button>

        {hasBranches && (
          <div className="flex items-start gap-3 mt-2">
            <span className="text-gray-400 text-sm font-medium mt-8">→</span>
            <div className="flex flex-col gap-3">
              {node.evolvesTo.map((child) => (
                <EvolutionNodeView key={child.speciesId} node={child} isFirst={true} />
              ))}
            </div>
          </div>
        )}
      </div>

      {hasSingleEvolution && (
        <EvolutionNodeView node={node.evolvesTo[0]} isFirst={false} />
      )}
    </div>
  );
};

export const EvolutionChain = ({ pokemonId }: EvolutionChainProps): JSX.Element => {
  const { data, isLoading, error } = useEvolutionChain(pokemonId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-gray-500 text-sm">Loading evolution chain...</span>
      </div>
    );
  }

  if (error !== null || data === undefined) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-red-500 text-sm">Failed to load evolution chain.</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <div className="flex items-start gap-2">
        <EvolutionNodeView node={data.chain} isFirst={true} />
      </div>
    </div>
  );
};
