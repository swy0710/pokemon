import type { Pokemon } from '@/domain/entities/Pokemon';

export interface BattleResult {
  winner: Pokemon;
  loser: Pokemon;
  log: string[];
  turns: number;
}

const getStat = (pokemon: Pokemon, statName: string): number => {
  const stat = pokemon.stats.find((s) => s.name === statName);
  return stat?.value ?? 0;
};

export const simulateBattle = (pokemon1: Pokemon, pokemon2: Pokemon): BattleResult => {
  let hp1 = getStat(pokemon1, 'hp');
  let hp2 = getStat(pokemon2, 'hp');
  const attack1 = getStat(pokemon1, 'attack');
  const attack2 = getStat(pokemon2, 'attack');
  const defense1 = getStat(pokemon1, 'defense');
  const defense2 = getStat(pokemon2, 'defense');
  const speed1 = getStat(pokemon1, 'speed');
  const speed2 = getStat(pokemon2, 'speed');

  const log: string[] = [];
  let turns = 0;

  while (hp1 > 0 && hp2 > 0) {
    turns += 1;

    const p1GoesFirst = speed1 >= speed2;

    if (p1GoesFirst) {
      const damage1 = Math.max(1, Math.floor((attack1 / defense2) * 10));
      hp2 = Math.max(0, hp2 - damage1);
      log.push(`${pokemon1.name} attacks ${pokemon2.name} for ${damage1} damage!`);

      if (hp2 <= 0) break;

      const damage2 = Math.max(1, Math.floor((attack2 / defense1) * 10));
      hp1 = Math.max(0, hp1 - damage2);
      log.push(`${pokemon2.name} attacks ${pokemon1.name} for ${damage2} damage!`);
    } else {
      const damage2 = Math.max(1, Math.floor((attack2 / defense1) * 10));
      hp1 = Math.max(0, hp1 - damage2);
      log.push(`${pokemon2.name} attacks ${pokemon1.name} for ${damage2} damage!`);

      if (hp1 <= 0) break;

      const damage1 = Math.max(1, Math.floor((attack1 / defense2) * 10));
      hp2 = Math.max(0, hp2 - damage1);
      log.push(`${pokemon1.name} attacks ${pokemon2.name} for ${damage1} damage!`);
    }
  }

  const winner = hp1 > 0 ? pokemon1 : pokemon2;
  const loser = hp1 > 0 ? pokemon2 : pokemon1;
  log.push(`${winner.name} wins the battle!`);

  return { winner, loser, log, turns };
};
