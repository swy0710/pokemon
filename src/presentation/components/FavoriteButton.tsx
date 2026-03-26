import { type JSX } from 'react';

import { useFavorites } from '@/presentation/hooks/useFavorites';

interface FavoriteButtonProps {
  pokemon: {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
  };
}

export const FavoriteButton = ({ pokemon }: FavoriteButtonProps): JSX.Element => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(pokemon.id);

  const handleClick = (): void => {
    if (favorited) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite({
        pokemonId: pokemon.id,
        pokemonName: pokemon.name,
        imageUrl: pokemon.imageUrl,
        types: pokemon.types,
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      className="text-2xl transition-transform hover:scale-110 focus:outline-none"
    >
      {favorited ? '★' : '☆'}
    </button>
  );
};
