import { type JSX } from 'react';

import type { Pokemon } from '@/domain/entities/Pokemon';
import type { BattleResult } from '@/domain/useCases/simulateBattle';

interface BattleArenaProps {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  result: BattleResult | null;
}

const getStat = (pokemon: Pokemon, statName: string): number => {
  const stat = pokemon.stats.find((s) => s.name === statName);
  return stat?.value ?? 0;
};

interface HpBarProps {
  pokemon: Pokemon;
  result: BattleResult | null;
}

const HpBar = ({ pokemon, result }: HpBarProps): JSX.Element => {
  const maxHp = getStat(pokemon, 'hp');
  const currentHp = result ? (result.winner.id === pokemon.id ? maxHp : 0) : maxHp;
  const percentage = maxHp > 0 ? Math.round((currentHp / maxHp) * 100) : 0;
  const isWinner = result !== null && result.winner.id === pokemon.id;

  const barColor =
    percentage > 50 ? 'bg-green-500' : percentage > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div
      className={`flex flex-col items-center rounded-2xl bg-white p-4 shadow-md ${isWinner ? 'ring-4 ring-yellow-400' : ''}`}
    >
      {isWinner && (
        <span className="mb-2 rounded-full bg-yellow-400 px-3 py-0.5 text-xs font-bold text-white">
          Winner!
        </span>
      )}
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="h-32 w-32 object-contain"
      />
      <p className="mt-2 font-bold capitalize text-gray-800">{pokemon.name}</p>
      <p className="text-xs text-gray-400">#{String(pokemon.id).padStart(4, '0')}</p>
      <div className="mt-3 w-full">
        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>HP</span>
          <span>
            {currentHp} / {maxHp}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const BattleArena = ({ pokemon1, pokemon2, result }: BattleArenaProps): JSX.Element => {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <HpBar pokemon={pokemon1} result={result} />
        </div>
        <div className="text-2xl font-black text-gray-500">VS</div>
        <div className="flex-1">
          <HpBar pokemon={pokemon2} result={result} />
        </div>
      </div>

      {result !== null && (
        <div className="mt-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-700">Battle Log</h3>
          <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-4">
            <ul className="space-y-1">
              {result.log.map((entry, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-600"
                >
                  <span className="mr-2 text-xs text-gray-400">{index + 1}.</span>
                  {entry}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-3 text-center text-sm text-gray-500">
            Battle ended in {result.turns} turn{result.turns !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};
