import { type JSX } from 'react';

import type { Pokemon } from '@/domain/entities/Pokemon';

interface PokemonComparisonProps {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
}

const MAX_STAT = 255;

export const PokemonComparison = ({ pokemon1, pokemon2 }: PokemonComparisonProps): JSX.Element => {
  const statNames = pokemon1.stats.map((s) => s.name);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-center text-xl font-bold text-gray-800">Stat Comparison</h2>

      {/* Pokemon headers */}
      <div className="mb-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <img
            src={pokemon1.imageUrl}
            alt={pokemon1.name}
            className="mx-auto h-20 w-20 object-contain"
          />
          <p className="mt-1 font-semibold capitalize text-gray-700">{pokemon1.name}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium text-gray-400">VS</span>
        </div>
        <div>
          <img
            src={pokemon2.imageUrl}
            alt={pokemon2.name}
            className="mx-auto h-20 w-20 object-contain"
          />
          <p className="mt-1 font-semibold capitalize text-gray-700">{pokemon2.name}</p>
        </div>
      </div>

      {/* Stat rows */}
      <div className="space-y-3">
        {statNames.map((statName) => {
          const stat1 = pokemon1.stats.find((s) => s.name === statName);
          const stat2 = pokemon2.stats.find((s) => s.name === statName);
          const val1 = stat1?.value ?? 0;
          const val2 = stat2?.value ?? 0;

          const bar1Width = Math.round((val1 / MAX_STAT) * 100);
          const bar2Width = Math.round((val2 / MAX_STAT) * 100);

          const p1Wins = val1 > val2;
          const p2Wins = val2 > val1;

          return (
            <div key={statName}>
              <p className="mb-1 text-center text-xs font-medium capitalize text-gray-500">
                {statName}
              </p>
              <div className="grid grid-cols-3 items-center gap-2">
                {/* Pokemon 1 bar (right-aligned) */}
                <div className="flex items-center justify-end gap-1">
                  <span
                    className={`text-sm font-semibold ${p1Wins ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    {val1}
                  </span>
                  <div className="h-3 w-24 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${p1Wins ? 'bg-green-400' : 'bg-blue-300'}`}
                      style={{ width: `${bar1Width}%` }}
                    />
                  </div>
                </div>

                {/* Stat name center spacer */}
                <div />

                {/* Pokemon 2 bar (left-aligned) */}
                <div className="flex items-center gap-1">
                  <div className="h-3 w-24 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${p2Wins ? 'bg-green-400' : 'bg-red-300'}`}
                      style={{ width: `${bar2Width}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-semibold ${p2Wins ? 'text-green-600' : 'text-gray-600'}`}
                  >
                    {val2}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
