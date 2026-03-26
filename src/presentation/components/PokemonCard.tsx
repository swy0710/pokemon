import { type JSX } from 'react';
import { useNavigate } from 'react-router-dom';

import { type Pokemon } from '@/domain/entities/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    void navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div
      className="cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <img
        src={pokemon.imageUrl}
        alt={pokemon.name}
        className="mx-auto h-24 w-24 object-contain"
      />
      <p className="mt-2 text-center text-xs text-gray-400">#{String(pokemon.id).padStart(4, '0')}</p>
      <h2 className="text-center text-sm font-semibold capitalize text-gray-800">{pokemon.name}</h2>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-600"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
