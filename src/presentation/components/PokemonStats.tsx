import { type JSX } from 'react';

import { type PokemonStat } from '@/domain/entities/Pokemon';

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const MAX_STAT = 255;

export const PokemonStats = ({ stats }: PokemonStatsProps): JSX.Element => {
  return (
    <div className="space-y-2">
      {stats.map((stat) => (
        <div key={stat.name} className="flex items-center gap-3">
          <span className="w-32 text-right text-xs capitalize text-gray-500">{stat.name}</span>
          <span className="w-8 text-right text-xs font-semibold text-gray-800">{stat.value}</span>
          <div className="flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: `${(stat.value / MAX_STAT) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
