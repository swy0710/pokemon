import { type JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type Favorite } from '@/domain/entities/Favorite';
import { PokemonComparison } from '@/presentation/components/PokemonComparison';
import { useFavorites } from '@/presentation/hooks/useFavorites';
import { usePokemon } from '@/presentation/hooks/usePokemon';

interface ComparisonLoaderProps {
  id1: number;
  id2: number;
}

const ComparisonLoader = ({ id1, id2 }: ComparisonLoaderProps): JSX.Element => {
  const { data: pokemon1, isLoading: loading1 } = usePokemon(id1);
  const { data: pokemon2, isLoading: loading2 } = usePokemon(id2);

  if (loading1 || loading2) {
    return <p className="text-center text-gray-400">Loading comparison...</p>;
  }

  if (!pokemon1 || !pokemon2) {
    return <p className="text-center text-red-400">Failed to load comparison data.</p>;
  }

  return <PokemonComparison pokemon1={pokemon1} pokemon2={pokemon2} />;
};

interface FavoriteCardProps {
  favorite: Favorite;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
}

const FavoriteCard = ({ favorite, isSelected, onToggleSelect }: FavoriteCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleNavigate = (): void => {
    void navigate(`/pokemon/${favorite.pokemonId}`);
  };

  return (
    <div
      className={`relative cursor-pointer rounded-2xl bg-white p-4 shadow-md transition-shadow hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-400' : ''}`}
    >
      <button
        onClick={() => onToggleSelect(favorite.pokemonId)}
        aria-label={isSelected ? 'Deselect for comparison' : 'Select for comparison'}
        className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-xs font-medium ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
      >
        {isSelected ? 'Selected' : 'Compare'}
      </button>

      <div
        onClick={handleNavigate}
        className="flex flex-col items-center"
      >
        <img
          src={favorite.imageUrl}
          alt={favorite.pokemonName}
          className="h-24 w-24 object-contain"
        />
        <p className="mt-2 font-semibold capitalize text-gray-800">{favorite.pokemonName}</p>
        <p className="text-xs text-gray-400">#{String(favorite.pokemonId).padStart(4, '0')}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {favorite.types.map((type) => (
            <span
              key={type}
              className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Favorites = (): JSX.Element => {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleBack = (): void => {
    void navigate('/');
  };

  const toggleSelect = (id: number): void => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        return [prev[1] ?? id, id];
      }
      return [...prev, id];
    });
  };

  const showComparison = selectedIds.length === 2;
  const comparisonId1 = selectedIds[0];
  const comparisonId2 = selectedIds[1];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">My Favorites</h1>
          <button
            onClick={handleBack}
            className="text-sm text-blue-500 hover:underline"
          >
            ← Back to Pokédex
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-gray-400">
            <p className="text-lg">No favorites yet.</p>
            <p className="mt-1 text-sm">Add some Pokémon from their detail pages!</p>
          </div>
        ) : (
          <>
            {selectedIds.length > 0 && selectedIds.length < 2 && (
              <p className="mb-4 text-sm text-blue-500">
                Select one more Pokémon to compare stats.
              </p>
            )}

            <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {favorites.map((favorite) => (
                <div key={favorite.pokemonId} className="relative">
                  <FavoriteCard
                    favorite={favorite}
                    isSelected={selectedIds.includes(favorite.pokemonId)}
                    onToggleSelect={toggleSelect}
                  />
                  <button
                    onClick={() => removeFavorite(favorite.pokemonId)}
                    aria-label="Remove from favorites"
                    className="absolute left-3 top-3 text-sm text-red-400 hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {showComparison && comparisonId1 !== undefined && comparisonId2 !== undefined && (
              <ComparisonLoader id1={comparisonId1} id2={comparisonId2} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
