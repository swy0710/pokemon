import { useState } from 'react';

import { pokemonRepository } from '@/app/pokemonRepository';
import type { Pokemon } from '@/domain/entities/Pokemon';
import { getPokemon } from '@/domain/useCases/getPokemon';
import { simulateBattle } from '@/domain/useCases/simulateBattle';
import type { BattleResult } from '@/domain/useCases/simulateBattle';

interface BattleState {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  result: BattleResult | null;
  isSimulating: boolean;
}

interface UseBattleReturn extends BattleState {
  selectPokemon1: (id: string) => Promise<void>;
  selectPokemon2: (id: string) => Promise<void>;
  startBattle: () => void;
  reset: () => void;
}

export const useBattle = (): UseBattleReturn => {
  const [state, setState] = useState<BattleState>({
    pokemon1: null,
    pokemon2: null,
    result: null,
    isSimulating: false,
  });

  const selectPokemon1 = async (id: string): Promise<void> => {
    const pokemon = await getPokemon(pokemonRepository, id);
    setState((prev) => ({ ...prev, pokemon1: pokemon, result: null }));
  };

  const selectPokemon2 = async (id: string): Promise<void> => {
    const pokemon = await getPokemon(pokemonRepository, id);
    setState((prev) => ({ ...prev, pokemon2: pokemon, result: null }));
  };

  const startBattle = (): void => {
    const { pokemon1, pokemon2 } = state;
    if (!pokemon1 || !pokemon2) return;

    setState((prev) => ({ ...prev, isSimulating: true }));
    const result = simulateBattle(pokemon1, pokemon2);
    setState((prev) => ({ ...prev, result, isSimulating: false }));
  };

  const reset = (): void => {
    setState({
      pokemon1: null,
      pokemon2: null,
      result: null,
      isSimulating: false,
    });
  };

  return {
    ...state,
    selectPokemon1,
    selectPokemon2,
    startBattle,
    reset,
  };
};
