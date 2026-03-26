import { type JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { EvolutionChain } from '@/presentation/components/EvolutionChain';
import { FavoriteButton } from '@/presentation/components/FavoriteButton';
import { PokemonStats } from '@/presentation/components/PokemonStats';
import { usePokemon } from '@/presentation/hooks/usePokemon';

export const Pokemon = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: pokemon, isLoading, isError } = usePokemon(id ?? '');

  const handleBack = (): void => {
    void navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading Pokémon...</p>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">Failed to load Pokémon. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={handleBack}
        className="mb-6 text-sm text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-400">#{String(pokemon.id).padStart(4, '0')}</p>
            <h1 className="text-3xl font-bold capitalize text-gray-800">{pokemon.name}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm capitalize text-gray-600"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          {/* slot:favorite-button */}
          <FavoriteButton pokemon={pokemon} />
        </div>

        {/* Image */}
        <div className="my-6 flex justify-center">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="h-48 w-48 object-contain"
          />
        </div>

        {/* Height & Weight */}
        <div className="mb-6 flex justify-around rounded-xl bg-gray-50 py-4">
          <div className="text-center">
            <p className="text-xs text-gray-400">Height</p>
            <p className="text-lg font-semibold text-gray-800">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400">Weight</p>
            <p className="text-lg font-semibold text-gray-800">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>

        {/* Stats */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-700">Base Stats</h2>
          <PokemonStats stats={pokemon.stats} />
        </section>

        {/* Moves */}
        <section className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-700">Moves</h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.moves.map((move) => (
              <span
                key={move}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm capitalize text-blue-600"
              >
                {move}
              </span>
            ))}
          </div>
        </section>

        {/* Evolution Chain */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-gray-700">Evolution Chain</h2>
          <EvolutionChain pokemonId={pokemon.id} />
        </section>
      </div>
    </div>
  );
};
