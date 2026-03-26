import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Favorite } from '@/domain/entities/Favorite';
import { BattleArena } from '@/presentation/components/BattleArena';
import { useBattle } from '@/presentation/hooks/useBattle';
import { useFavorites } from '@/presentation/hooks/useFavorites';

interface FavoriteSelectorProps {
  label: string;
  favorites: Favorite[];
  selectedId: number | null;
  onSelect: (id: string) => void;
}

const FavoriteSelector = ({
  label,
  favorites,
  selectedId,
  onSelect,
}: FavoriteSelectorProps): JSX.Element => {
  const [search, setSearch] = useState('');

  const filtered = favorites.filter((f) =>
    f.pokemonName.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const handleSelect = (id: number): void => {
    onSelect(String(id));
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 shadow-md">
      <h3 className="mb-3 font-semibold text-gray-700">{label}</h3>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={handleSearchChange}
        className="mb-3 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
      />
      {favorites.length === 0 ? (
        <p className="text-center text-sm text-gray-400">
          No favorites yet. Add some Pokémon first!
        </p>
      ) : (
        <div className="max-h-48 overflow-y-auto space-y-1">
          {filtered.map((f) => (
            <button
              key={f.pokemonId}
              onClick={(): void => { handleSelect(f.pokemonId); }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 ${selectedId === f.pokemonId ? 'bg-blue-50 font-semibold text-blue-600' : 'text-gray-700'}`}
            >
              <img
                src={f.imageUrl}
                alt={f.pokemonName}
                className="h-8 w-8 object-contain"
              />
              <span className="capitalize">{f.pokemonName}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Battle = (): JSX.Element => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const {
    pokemon1,
    pokemon2,
    result,
    isSimulating,
    selectPokemon1,
    selectPokemon2,
    startBattle,
    reset,
  } = useBattle();

  const handleBack = (): void => {
    void navigate('/');
  };

  const handleSelect1 = (id: string): void => {
    void selectPokemon1(id);
  };

  const handleSelect2 = (id: string): void => {
    void selectPokemon2(id);
  };

  const bothSelected = pokemon1 !== null && pokemon2 !== null;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Battle Simulator</h1>
          <button
            onClick={handleBack}
            className="text-sm text-blue-500 hover:underline"
          >
            ← Back to Pokédex
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Select two Pokémon from your favorites to simulate a battle!
        </p>

        <div className="grid grid-cols-2 gap-4">
          <FavoriteSelector
            label="Fighter 1"
            favorites={favorites}
            selectedId={pokemon1?.id ?? null}
            onSelect={handleSelect1}
          />
          <FavoriteSelector
            label="Fighter 2"
            favorites={favorites}
            selectedId={pokemon2?.id ?? null}
            onSelect={handleSelect2}
          />
        </div>

        {bothSelected && (
          <BattleArena
            pokemon1={pokemon1}
            pokemon2={pokemon2}
            result={result}
          />
        )}

        <div className="mt-6 flex justify-center gap-4">
          {bothSelected && result === null && (
            <button
              onClick={startBattle}
              disabled={isSimulating}
              className="rounded-xl bg-red-500 px-8 py-3 font-bold text-white shadow-md transition-colors hover:bg-red-600 disabled:opacity-50"
            >
              {isSimulating ? 'Simulating...' : 'Start Battle!'}
            </button>
          )}
          {result !== null && (
            <button
              onClick={reset}
              className="rounded-xl bg-gray-600 px-8 py-3 font-bold text-white shadow-md transition-colors hover:bg-gray-700"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
